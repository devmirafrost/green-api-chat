export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface Chat {
  id: string;    
  name: string;     
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean;
}