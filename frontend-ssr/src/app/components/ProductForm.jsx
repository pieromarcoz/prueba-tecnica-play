'use client';
import {useForm} from 'react-hook-form';
import {useProductStore} from '@/store/useProductStore';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {getImageUrl} from "@/lib/helpers";

export default function ProductForm({id, initialData}) {
    const router = useRouter();
    const {createProduct, updateProduct} = useProductStore();
    const [preview, setPreview] = useState(initialData?.image || '');

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        defaultValues: initialData || {
            name: '',
            description: '',
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);

            // Verificar si hay un archivo nuevo
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            if (id) {
                await updateProduct(id, formData);
            } else {
                await createProduct(formData);
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                    {...register('name', {required: 'El nombre es requerido'})}
                    className="w-full p-2 border rounded"
                    placeholder="Nombre del producto"
                />
                {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                    {...register('description', {required: 'La descripción es requerida'})}
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Descripción del producto"
                />
                {errors.description && (
                    <span className="text-red-500 text-sm">{errors.description.message}</span>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Imagen</label>
                {preview && (
                    <div className="mt-2 relative h-48 w-full">
                        <img
                            src={getImageUrl(preview)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                )}
                <input
                    type="file"
                    {...register('image', {
                        required: !id && 'La imagen es requerida',
                        onChange: handleImageChange
                    })}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                />
                {errors.image && (
                    <span className="text-red-500 text-sm">{errors.image.message}</span>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`
                    w-full py-2 px-4 rounded text-white
                    ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}
                    transition-colors
                `}
            >
                {isSubmitting
                    ? 'Guardando...'
                    : id ? 'Actualizar Producto' : 'Crear Producto'
                }
            </button>
        </form>
    );
}