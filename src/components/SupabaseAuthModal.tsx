import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Key, Database } from 'lucide-react';
import { useHybridCMS } from '../contexts/HybridCMSContext';

interface SupabaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseAuthModal: React.FC<SupabaseAuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, isAuthenticated, dataSource } = useHybridCMS();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signIn) {
      setError('Авторизация недоступна в режиме localStorage');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await signIn(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  // Close modal if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="size-5 text-teal-500" />
            {dataSource === 'supabase' ? 'Вход в CMS (Supabase)' : 'CMS (localStorage)'}
          </DialogTitle>
        </DialogHeader>

        {dataSource === 'localStorage' ? (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                CMS работает в режиме localStorage. Авторизация не требуется.
              </AlertDescription>
            </Alert>
            <Button onClick={onClose} className="w-full">
              Понятно
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Пароль</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 size-4" />
                    Войти
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Используйте учетные данные Supabase для доступа к CMS панели
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};