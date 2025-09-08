# 🚀 Быстрый запуск динамического портфолио

## Запустить за 3 минуты

### 1️⃣ Подготовка
```bash
# Убедитесь что Docker Desktop запущен
# Скачайте все файлы проекта в папку portfolio-website
# Откройте терминал в папке с проектом
```

### 2️⃣ Настройка
```bash
# Скопируйте файл окружения
cp .env.example .env
```

### 3️⃣ Запуск
```bash
# Разработка (с горячей перезагрузкой)
docker-compose -f docker-compose.dev.yml up --build

# ИЛИ продакшн режим
docker-compose up --build
```

### 4️⃣ Готово! 
Откройте браузер: **http://localhost:3000**

---

## 🎯 Что у вас есть:

✅ **Динамический сайт с CMS**  
✅ **Полнофункциональная админка** (пароль: `admin123`)  
✅ **15+ API endpoints** для управления данными  
✅ **Автоматический fallback** на демо-данные  
✅ **Supabase интеграция** готова к подключению  
✅ **Гибридная архитектура** с graceful degradation  
✅ **Все анимации и адаптивность**  
✅ **SEO + Google Analytics**  

---

## 📝 Основные команды:

```bash
# Остановить
docker-compose down

# Посмотреть логи
docker-compose logs -f

# Перезапустить
docker-compose restart

# Очистить все и пересобрать
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**Готово к использованию!** 🎉