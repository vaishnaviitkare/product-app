import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(120, { message: 'Title cannot exceed 120 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' }),
  price: z
    .number({ message: 'Price must be a valid number' })
    .positive({ message: 'Price must be greater than 0' })
    .max(1000000, { message: 'Price must be less than $1,000,000' }),
  category: z
    .string()
    .min(2, { message: 'Category is required' })
    .max(50, { message: 'Category cannot exceed 50 characters' }),
  thumbnail: z
    .string()
    .min(1, { message: 'Image URL is required' })
    .url({ message: 'Please enter a valid URL (e.g. https://images.unsplash.com/...)' }),
  rating: z
    .number({ message: 'Rating must be a number' })
    .min(0, { message: 'Rating must be at least 0' })
    .max(5, { message: 'Rating cannot exceed 5.0' }),
  stock: z
    .number({ message: 'Stock must be a number' })
    .int({ message: 'Stock must be a whole number' })
    .min(0, { message: 'Stock cannot be negative' })
    .optional(),
  brand: z
    .string()
    .max(50, { message: 'Brand cannot exceed 50 characters' })
    .optional(),
});

export type ProductFormSchema = z.infer<typeof productSchema>;
