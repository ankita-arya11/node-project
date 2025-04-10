import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z
    .number({ invalid_type_error: 'Product ID must be a number' })
    .int()
    .positive('Product ID must be a positive number'),
});

export const removeFromCartSchema = z.object({
  productId: z
    .string()
    .regex(/^\d+$/, 'Product ID must be a valid number')
    .transform((val) => parseInt(val, 10)),
});
