import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    phone: z
        .string()
        .trim()
        .regex(/^\d{10}$/, 'Phone must be a 10-digit number')
        .optional(),
    age: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => val >= 0 && val <= 120, {
            message: 'Age must be between 0 and 120',
        })
        .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
});


