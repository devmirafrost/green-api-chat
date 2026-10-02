import type { Chat } from '@/types';

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (chatId: string) => void;
  onCreate: (phone: string) => void;
}

export const ChatList = ({ chats, activeChatId, onSelect, onCreate }: ChatListProps) => {
  const handleCreate = () => {
    const phone = prompt('Введите номер телефона (например, 79999999999):');
    if (phone) onCreate(phone);
  };

  return (
    <aside
      style={{
        width: 280,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <button onClick={handleCreate} style={{ width: '100%', padding: 10 }}>
          + Новый чат
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {chats.length === 0 && (
          <p style={{ padding: 12, color: '#888' }}>Нет чатов. Создайте первый.</p>
        )}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            style={{
              padding: 12,
              cursor: 'pointer',
              background: chat.id === activeChatId ? '#e3f2fd' : 'transparent',
              borderBottom: '1px solid #eee',
            }}
          >
            <strong>{chat.name}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
};