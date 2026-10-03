import { useState } from 'react';
import { DEFAULT_CREDENTIALS } from '@/constants';
import { MaxLogo } from '@/components/MaxLogo';
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
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <MaxLogo size={80} />
        <h1 className="auth-title">Вход в чат</h1>
        <p className="auth-subtitle">
          Введите данные из личного кабинета GREEN-API
        </p>

        <label className="auth-label">
          idInstance
          <input
            className="auth-input"
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="1101000000"
          />
        </label>

        <label className="auth-label">
          apiTokenInstance
          <input
            className="auth-input"
            type="text"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="ваш токен"
          />
        </label>

        <button className="auth-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};