# Backend API - Prueba Técnica

Backend desarrollado en Laravel para gestionar productos con arquitectura de servicios y repositorios.

## Tecnologías Utilizadas

- Laravel 10
- PHP 8.1
- MySQL
- Arquitectura de Servicios y Repositorios
- API RESTful

## Estructura del Proyecto
app/
├── Http/
│   ├── Controllers/
│   │   └── ProductController.php
│   ├── Requests/
│   │   ├── StoreProductRequest.php
│   │   └── UpdateProductRequest.php
│   └── Responses/
│       └── ApiResponse.php
├── Models/
│   └── Product.php
├── Services/
│   └── ProductService.php
├── Repositories/
│   ├── Interfaces/
│   │   └── ProductInterface.php
│   └── ProductRepository.php

## Flujo de Datos

La request llega al Controller
El Controller valida los datos usando FormRequests
El Controller llama al Service apropiado
El Service utiliza el Repository para operaciones de datos
El Repository interactúa con el Model
La respuesta sigue el camino inverso
ApiResponse formatea la respuesta final
## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/pieromarcoz/prueba-tecnica-play
cd backend
composer install
cp .env.example .env

APP_URL=http://backend.test
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

php artisan key:generate

php artisan storage:link

php artisan migrate --seed

```
# Frontend SSR - Prueba Técnica

Frontend desarrollado con Next.js 14 (App Router) para gestión de productos con Server-Side Rendering.

## Tecnologías Utilizadas

- Next.js 14 (App Router)
- React Hook Form para manejo de formularios
- Zustand para gestión de estado
- Tailwind CSS para estilos
- Axios para peticiones HTTP

```bash
cd frontend-ssr

npm install

.env.local
NEXT_PUBLIC_BACKEND_URL=http://backend.test/api

npm run dev


```

Funcionalidades
Listado de Productos
Formulario de Producto
Manejo de Imágenes



