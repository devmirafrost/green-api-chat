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
    <div className="scrollListContent">
      {chats.length === 0 && (
        <div className="chatList-empty">Нет чатов. Создайте первый.</div>
      )}

      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`item ${chat.id === activeChatId ? 'item--selected' : ''}`}
          onClick={() => onSelect(chat.id)}
        >
          <div className="wrapper wrapper--withActions">
            <button className="cell" type="button">
              <div className="avatarComposition">
                <div className="avatarBadgeWrapper">
                  <div className="avatarStoryRingWrapper">
                    <div className="avatarStoryRingMask">
                      <div className="avatarImage">
                        {chat.name[0].toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="title">
                <span className="name">
                  <span className="text">{chat.name}</span>
                </span>
              </h3>

              <span className="preview">Нажмите, чтобы открыть</span>

              <div className="meta">
                <span className="time">
                  {new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            </button>

            <div className="actions">
              <button
                className="menuButton"
                type="button"
                aria-label="Еще"
                onClick={(e) => e.stopPropagation()}
              >
                ⋯
              </button>
            </div>
          </div>
        </div>
      ))}

      <button className="chatList-create" onClick={handleCreate}>
        + Новый чат
      </button>
    </div>
  );
};