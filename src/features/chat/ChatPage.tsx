import { useChat } from '@/hooks/useChat';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import type { GreenApiCredentials } from '@/types';

interface ChatPageProps {
  credentials: GreenApiCredentials;
  onLogout: () => void;
}

export const ChatPage = ({ credentials, onLogout }: ChatPageProps) => {
  const {
    chats,
    messages,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
  } = useChat(credentials);

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">MAX</div>
          <button className="sidebar-logout" onClick={onLogout}>
            Выйти
          </button>
        </div>
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelect={setActiveChatId}
          onCreate={createChat}
        />
      </aside>

      <main className="main">
        {activeChatId && activeChat ? (
          <>
            <header className="main-header">
              <div className="main-avatar">{activeChat.name[0]}</div>
              <div className="main-name">{activeChat.name}</div>
            </header>
            <ChatWindow
              messages={messages[activeChatId] || []}
              onSend={sendMessage}
            />
          </>
        ) : (
          <div className="main-empty">Выберите чат или создайте новый</div>
        )}
      </main>
    </div>
  );
};