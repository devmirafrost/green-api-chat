import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/features/auth/AuthForm';
import { ChatPage } from '@/features/chat/ChatPage';

function App() {
  const { credentials, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <div style={{ padding: 24 }}>Загрузка...</div>;
  }

  if (!credentials) {
    return <AuthForm onSubmit={login} />;
  }

  return <ChatPage credentials={credentials} onLogout={logout} />;
}

export default App;