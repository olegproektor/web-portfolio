#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода цветного текста
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Заголовок
echo -e "${BLUE}"
echo "=================================================="
echo "    Portfolio Website - Быстрая настройка"
echo "=================================================="
echo -e "${NC}"

# Проверка зависимостей
print_status "Проверка системных требований..."

# Проверка Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker не установлен!"
    echo "Установите Docker Desktop: https://www.docker.com/products/docker-desktop/"
    exit 1
fi
print_success "Docker установлен: $(docker --version)"

# Проверка Docker Compose
if ! command -v docker-compose &> /dev/null; then
    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose не установлен!"
        exit 1
    else
        COMPOSE_CMD="docker compose"
    fi
else
    COMPOSE_CMD="docker-compose"
fi
print_success "Docker Compose доступен"

# Проверка Git
if ! command -v git &> /dev/null; then
    print_warning "Git не установлен. Некоторые функции могут быть недоступны."
else
    print_success "Git установлен: $(git --version)"
fi

# Создание .env файла
print_status "Настройка переменных окружения..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success ".env файл создан из шаблона"
    else
        print_warning ".env.example не найден, создаю базовый .env"
        cat > .env << EOF
# Google Analytics (опционально)
VITE_GA_ID=G-DEVELOPMENT

# Supabase Configuration (опционально)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Development
NODE_ENV=development
EOF
    fi
else
    print_warning ".env файл уже существует, пропускаю создание"
fi

# Меню выбора режима
echo ""
print_status "Выберите режим запуска:"
echo "1) Режим разработки (с hot reload)"
echo "2) Производственный режим"
echo "3) Только сборка Docker образа"
echo "4) Настройка VS Code (установка расширений)"
read -p "Введите номер (1-4): " choice

case $choice in
    1)
        print_status "Запуск в режиме разработки..."
        
        # Остановка предыдущих контейнеров
        print_status "Остановка предыдущих контейнеров..."
        $COMPOSE_CMD -f docker-compose.dev.yml down --remove-orphans
        
        # Сборка и запуск
        print_status "Сборка и запуск контейнеров..."
        $COMPOSE_CMD -f docker-compose.dev.yml up --build -d
        
        if [ $? -eq 0 ]; then
            print_success "Сервер запущен в режиме разработки!"
            print_status "URL: http://localhost:5173"
            print_status "CMS пароль (localStorage): admin123"
        else
            print_error "Ошибка при запуске сервера!"
            exit 1
        fi
        ;;
    2)
        print_status "Запуск в производственном режиме..."
        
        # Остановка предыдущих контейнеров
        print_status "Остановка предыдущих контейнеров..."
        $COMPOSE_CMD down --remove-orphans
        
        # Сборка и запуск
        print_status "Сборка и запуск контейнеров..."
        $COMPOSE_CMD up --build -d
        
        if [ $? -eq 0 ]; then
            print_success "Сервер запущен в производственном режиме!"
            print_status "URL: http://localhost:3000"
        else
            print_error "Ошибка при запуске сервера!"
            exit 1
        fi
        ;;
    3)
        print_status "Сборка Docker образа..."
        docker build -t portfolio-website .
        
        if [ $? -eq 0 ]; then
            print_success "Docker образ собран успешно!"
        else
            print_error "Ошибка при сборке образа!"
            exit 1
        fi
        ;;
    4)
        print_status "Настройка VS Code..."
        
        # Проверка VS Code
        if ! command -v code &> /dev/null; then
            print_error "VS Code не установлен!"
            echo "Установите VS Code: https://code.visualstudio.com/"
            exit 1
        fi
        
        # Установка расширений
        print_status "Установка необходимых расширений..."
        
        extensions=(
            "ms-vscode.vscode-docker"
            "ms-vscode-remote.remote-containers"
            "bradlc.vscode-tailwindcss"
            "eamodio.gitlens"
            "esbenp.prettier-vscode"
            "dbaeumer.vscode-eslint"
            "ms-vscode.vscode-typescript-next"
        )
        
        for ext in "${extensions[@]}"; do
            print_status "Установка $ext..."
            code --install-extension "$ext"
        done
        
        print_success "VS Code настроен!"
        print_status "Откройте проект: code ."
        ;;
    *)
        print_error "Неверный выбор!"
        exit 1
        ;;
esac

# Финальные инструкции
echo ""
echo -e "${GREEN}=================================================="
echo "              Настройка завершена!"
echo -e "==================================================${NC}"
echo ""
print_status "Полезные команды:"
echo "  Просмотр логов:     $COMPOSE_CMD logs -f"
echo "  Остановка:          $COMPOSE_CMD down"
echo "  Перезапуск:         $COMPOSE_CMD restart"
echo "  Статус контейнеров: docker ps"
echo ""
print_status "Документация:"
echo "  - SUPABASE_INTEGRATION_GUIDE.md - Настройка Supabase"
echo "  - LOCAL_DEVELOPMENT_GUIDE.md - Подробное руководство"
echo ""
print_success "Готово к работе! 🚀"