import { useState } from 'react';
import { DEFAULT_CREDENTIALS } from '@/constants';
import type { GreenApiCredentials } from '@/types';

interface AuthFormProps {
  onSubmit: (creds: GreenApiCredentials) => void;
}

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const [idInstance, setIdInstance] = useState(DEFAULT_CREDENTIALS.idInstance);
  const [apiTokenInstance, setApiTokenInstance] = useState(
    DEFAULT_CREDENTIALS.apiTokenInstance
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idInstance.trim() || !apiTokenInstance.trim()) return;
    onSubmit({ idInstance, apiTokenInstance });
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h1>Вход в GREEN-API Chat</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>idInstance</label>
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="1101000000"
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>apiTokenInstance</label>
          <input
            type="text"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="ваш токен"
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Войти
        </button>
      </form>
    </div>
  );
};