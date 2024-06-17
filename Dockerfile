FROM php:8.3-fpm

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets

# Definir diretório de trabalho
WORKDIR /var/www

# Remover pasta html padrão e linkar a pasta do projeto Laravel como html
RUN rm -rf /var/www/html
RUN ln -s public html

# Copiar aplicação existente para o container
COPY backend/ /var/www

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências do projeto com Composer
RUN composer install

# Dar permissão ao usuário www-data para a pasta do projeto
RUN chown -R www-data:www-data /var/www

# Expor porta 9000 e iniciar php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
