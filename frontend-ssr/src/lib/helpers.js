export const getImageUrl = (path) => {
    // Si la URL ya es completa (comienza con http), retornarla directamente
    if (path?.startsWith('http')) {
        return path;
    }

    // Si hay path pero no es URL completa, agregarle el backend URL
    if (path) {
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
    }

    // Si no hay path, retornar placeholder
    return 'https://placehold.co/600x400/';
};