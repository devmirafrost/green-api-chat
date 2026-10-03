import { API_URL } from '@/constants';
import type { GreenApiCredentials } from '@/types';

export interface GreenApiNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    senderData?: {
      chatId: string;
      sender: string;
      senderName?: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
    timestamp?: number;
    idMessage?: string;
  };
}

export const setSettings = async (
  creds: GreenApiCredentials
): Promise<void> => {
  const url = `${API_URL}/waInstance${creds.idInstance}/setSettings/${creds.apiTokenInstance}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      webhookUrl: '',
      outgoingWebhook: 'yes',
      stateWebhook: 'yes',
      incomingWebhook: 'yes',
    }),
  });

  if (!response.ok) {
    throw new Error(`SetSettings failed: ${response.status}`);
  }
};

export const sendMessage = async (
  creds: GreenApiCredentials,
  chatId: string,
  message: string
): Promise<{ idMessage: string }> => {
  const url = `${API_URL}/waInstance${creds.idInstance}/sendMessage/${creds.apiTokenInstance}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });

  if (!response.ok) {
    throw new Error(`Send failed: ${response.status}`);
  }

  return response.json();
};

export const receiveNotification = async (
  creds: GreenApiCredentials
): Promise<GreenApiNotification | null> => {
  const url = `${API_URL}/waInstance${creds.idInstance}/receiveNotification/${creds.apiTokenInstance}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Receive failed: ${response.status}`);
  }

  const text = await response.text();

  if (!text || text.trim() === '') {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export const deleteNotification = async (
  creds: GreenApiCredentials,
  receiptId: number
): Promise<void> => {
  const url = `${API_URL}/waInstance${creds.idInstance}/deleteNotification/${creds.apiTokenInstance}/${receiptId}`;

  await fetch(url, { method: 'DELETE' });
};