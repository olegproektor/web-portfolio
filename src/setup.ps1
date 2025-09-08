# PowerShell скрипт для настройки проекта на Windows

# Цвета для вывода
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Print-Status($message) {
    Write-ColorOutput Blue "[INFO] $message"
}

function Print-Success($message) {
    Write-ColorOutput Green "[SUCCESS] $message"
}

function Print-Warning($message) {
    Write-ColorOutput Yellow "[WARNING] $message"
}

function Print-Error($message) {
    Write-ColorOutput Red "[ERROR] $message"
}

# Заголовок
Write-ColorOutput Blue "=================================================="
Write-ColorOutput Blue "    Portfolio Website - Быстрая настройка"
Write-ColorOutput Blue "=================================================="
Write-Output ""

# Проверка зависимостей
Print-Status "Проверка системных требований..."

# Проверка Docker
try {
    $dockerVersion = docker --version
    Print-Success "Docker установлен: $dockerVersion"
}
catch {
    Print-Error "Docker не установлен!"
    Write-Output "Установите Docker Desktop: https://www.docker.com/products/docker-desktop/"
    exit 1
}

# Проверка Docker Compose
try {
    $composeVersion = docker compose version
    $ComposeCmd = "docker compose"
    Print-Success "Docker Compose доступен"
}
catch {
    try {
        docker-compose --version | Out-Null
        $ComposeCmd = "docker-compose"
        Print-Success "Docker Compose доступен"
    }
    catch {
        Print-Error "Docker Compose не установлен!"
        exit 1
    }
}

# Проверка Git
try {
    $gitVersion = git --version
    Print-Success "Git установлен: $gitVersion"
}
catch {
    Print-Warning "Git не установлен. Некоторые функции могут быть недоступны."
}

# Создание .env файла
Print-Status "Настройка переменных окружения..."

if (!(Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Print-Success ".env файл создан из шаблона"
    }
    else {
        Print-Warning ".env.example не найден, создаю базовый .env"
        @"
# Google Analytics (опционально)
VITE_GA_ID=G-DEVELOPMENT

# Supabase Configuration (опционально)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Development
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding utf8
    }
}
else {
    Print-Warning ".env файл уже существует, пропускаю создание"
}

# Меню выбора режима
Write-Output ""
Print-Status "Выберите режим запуска:"
Write-Output "1) Режим разработки (с hot reload)"
Write-Output "2) Производственный режим"
Write-Output "3) Только сборка Docker образа"
Write-Output "4) Настройка VS Code (установка расширений)"

$choice = Read-Host "Введите номер (1-4)"

switch ($choice) {
    "1" {
        Print-Status "Запуск в режиме разработки..."
        
        # Остановка предыдущих контейнеров
        Print-Status "Остановка предыдущих контейнеров..."
        Invoke-Expression "$ComposeCmd -f docker-compose.dev.yml down --remove-orphans"
        
        # Сборка и запуск
        Print-Status "Сборка и запуск контейнеров..."
        Invoke-Expression "$ComposeCmd -f docker-compose.dev.yml up --build -d"
        
        if ($LASTEXITCODE -eq 0) {
            Print-Success "Сервер запущен в режиме разработки!"
            Print-Status "URL: http://localhost:5173"
            Print-Status "CMS пароль (localStorage): admin123"
        }
        else {
            Print-Error "Ошибка при запуске сервера!"
            exit 1
        }
    }
    "2" {
        Print-Status "Запуск в производственном режиме..."
        
        # Остановка предыдущих контейнеров
        Print-Status "Остановка предыдущих контейнеров..."
        Invoke-Expression "$ComposeCmd down --remove-orphans"
        
        # Сборка и запуск
        Print-Status "Сборка и запуск контейнеров..."
        Invoke-Expression "$ComposeCmd up --build -d"
        
        if ($LASTEXITCODE -eq 0) {
            Print-Success "Сервер запущен в производственном режиме!"
            Print-Status "URL: http://localhost:3000"
        }
        else {
            Print-Error "Ошибка при запуске сервера!"
            exit 1
        }
    }
    "3" {
        Print-Status "Сборка Docker образа..."
        docker build -t portfolio-website .
        
        if ($LASTEXITCODE -eq 0) {
            Print-Success "Docker образ собран успешно!"
        }
        else {
            Print-Error "Ошибка при сборке образа!"
            exit 1
        }
    }
    "4" {
        Print-Status "Настройка VS Code..."
        
        # Проверка VS Code
        try {
            code --version | Out-Null
        }
        catch {
            Print-Error "VS Code не установлен!"
            Write-Output "Установите VS Code: https://code.visualstudio.com/"
            exit 1
        }
        
        # Установка расширений
        Print-Status "Установка необходимых расширений..."
        
        $extensions = @(
            "ms-vscode.vscode-docker",
            "ms-vscode-remote.remote-containers",
            "bradlc.vscode-tailwindcss",
            "eamodio.gitlens",
            "esbenp.prettier-vscode",
            "dbaeumer.vscode-eslint",
            "ms-vscode.vscode-typescript-next"
        )
        
        foreach ($ext in $extensions) {
            Print-Status "Установка $ext..."
            code --install-extension $ext
        }
        
        Print-Success "VS Code настроен!"
        Print-Status "Откройте проект: code ."
    }
    default {
        Print-Error "Неверный выбор!"
        exit 1
    }
}

# Финальные инструкции
Write-Output ""
Write-ColorOutput Green "=================================================="
Write-ColorOutput Green "              Настройка завершена!"
Write-ColorOutput Green "=================================================="
Write-Output ""
Print-Status "Полезные команды:"
Write-Output "  Просмотр логов:     $ComposeCmd logs -f"
Write-Output "  Остановка:          $ComposeCmd down"
Write-Output "  Перезапуск:         $ComposeCmd restart"
Write-Output "  Статус контейнеров: docker ps"
Write-Output ""
Print-Status "Документация:"
Write-Output "  - SUPABASE_INTEGRATION_GUIDE.md - Настройка Supabase"
Write-Output "  - LOCAL_DEVELOPMENT_GUIDE.md - Подробное руководство"
Write-Output ""
Print-Success "Готово к работе! 🚀"