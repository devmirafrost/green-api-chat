import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/types';

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string) => void;
}

export const ChatWindow = ({ messages, onSend }: ChatWindowProps) => {
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f9f9f9' }}>
        {messages.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center' }}>Нет сообщений</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              justifyContent: m.isOutgoing ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: 12,
                background: m.isOutgoing ? '#007bff' : 'white',
                color: m.isOutgoing ? 'white' : 'black',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          padding: 12,
          borderTop: '1px solid #ddd',
          gap: 8,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Отправить
        </button>
      </form>
    </div>
  );
};