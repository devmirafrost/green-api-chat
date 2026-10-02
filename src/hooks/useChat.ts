import { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat, Message, GreenApiCredentials } from '@/types';
import {
  sendMessage as apiSendMessage,
  receiveNotification,
  deleteNotification,
} from '../api/greenApi';

const POLL_INTERVAL = 3000;

export const useChat = (creds: GreenApiCredentials) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  const credsRef = useRef(creds);
  credsRef.current = creds;

  const createChat = useCallback((phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) return;
    const chatId = `${cleanPhone}@c.us`;

    setChats((prev) => {
      if (prev.some((c) => c.id === chatId)) return prev;
      return [...prev, { id: chatId, name: cleanPhone }];
    });
    setActiveChatId(chatId);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!activeChatId || !text.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const newMessage: Message = {
      id: tempId,
      chatId: activeChatId,
      text,
      timestamp: Date.now(),
      isOutgoing: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));

    try {
      const result = await apiSendMessage(credsRef.current, activeChatId, text);
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: (prev[activeChatId] || []).map((m) =>
          m.id === tempId ? { ...m, id: result.idMessage } : m
        ),
      }));
    } catch (err) {
      console.error('Send error:', err);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (!isPolling) return;

    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;

      try {
        const notification = await receiveNotification(credsRef.current);

        if (notification && !cancelled) {
          const { body, receiptId } = notification;

          if (
            body.typeWebhook === 'incomingMessageReceived' &&
            body.messageData?.typeMessage === 'textMessage' &&
            body.senderData?.chatId &&
            body.messageData.textMessageData?.textMessage
          ) {
            const chatId = body.senderData.chatId;
            const text = body.messageData.textMessageData.textMessage;

            setChats((prev) => {
              if (prev.some((c) => c.id === chatId)) return prev;
              return [
                ...prev,
                {
                  id: chatId,
                  name: body.senderData?.senderName || chatId.split('@')[0],
                },
              ];
            });

            setMessages((prev) => ({
              ...prev,
              [chatId]: [
                ...(prev[chatId] || []),
                {
                  id: body.idMessage || `in-${receiptId}`,
                  chatId,
                  text,
                  timestamp: (body.timestamp || Date.now() / 1000) * 1000,
                  isOutgoing: false,
                },
              ],
            }));
          }

          await deleteNotification(credsRef.current, receiptId);
        }
      } catch (err) {
        console.error('Poll error:', err);
      }

      if (!cancelled) {
        setTimeout(poll, POLL_INTERVAL);
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [isPolling]);

  return {
    chats,
    messages,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
    isPolling,
    setIsPolling,
  };
};