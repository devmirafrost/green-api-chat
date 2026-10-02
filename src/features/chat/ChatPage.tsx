import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';

export const ChatPage = () => {
  const { credentials, logout } = useAuth();
  const {
    chats,
    messages,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
  } = useChat(credentials!);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: 12,
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>GREEN-API Chat</strong>
        <button onClick={logout} style={{ padding: '6px 12px' }}>
          Выйти
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelect={setActiveChatId}
          onCreate={createChat}
        />
        {activeChatId ? (
          <ChatWindow
            messages={messages[activeChatId] || []}
            onSend={sendMessage}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
            }}
          >
            Выберите чат или создайте новый
          </div>
        )}
      </div>
    </div>
  );
};