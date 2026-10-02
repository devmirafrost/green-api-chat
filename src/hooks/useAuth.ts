import { useState, useEffect } from 'react';
import type { GreenApiCredentials } from '@/types';

const STORAGE_KEY = 'green-api-credentials';

export const useAuth = () => {
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCredentials(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (creds: GreenApiCredentials) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
    setCredentials(creds);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCredentials(null);
  };

  return { credentials, isLoading, login, logout };
};