# Удаленные файлы

Следующие файлы были удалены при откате до состояния до Supabase интеграции:

- HybridCMSContext.tsx - гибридный контекст для работы с Supabase и localStorage
- SupabaseCMSContext.tsx - контекст для работы с Supabase

Теперь используется только оригинальный CMSContext.tsx с localStorage.