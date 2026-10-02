import { useAuth } from './hooks/useAuth';
import { AuthForm } from './features/auth/AuthForm';

function App() {
  const { credentials, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <div style={{ padding: 24 }}>Загрузка...</div>;
  }

  if (!credentials) {
    return <AuthForm onSubmit={login} />;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Добро пожаловать!</h1>
      <p>idInstance: {credentials.idInstance}</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}

export default App;