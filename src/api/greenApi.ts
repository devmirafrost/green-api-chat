import type { GreenApiCredentials } from '@/types';

const BASE_URL = 'https://3100.api.green-api.com';

export const sendMessage = async (
  creds: GreenApiCredentials,
  chatId: string,
  message: string
): Promise<{ idMessage: string }> => {
  const url = `${BASE_URL}/waInstance${creds.idInstance}/sendMessage/${creds.apiTokenInstance}`;

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
  const url = `${BASE_URL}/waInstance${creds.idInstance}/receiveNotification/${creds.apiTokenInstance}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Receive failed: ${response.status}`);
  }

  const data = await response.json();
  return data; // null если очередь пуста
};

export const deleteNotification = async (
  creds: GreenApiCredentials,
  receiptId: number
): Promise<void> => {
  const url = `${BASE_URL}/waInstance${creds.idInstance}/deleteNotification/${creds.apiTokenInstance}/${receiptId}`;

  await fetch(url, { method: 'DELETE' });
};

// Тип ответа от GREEN-API
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