import z from 'zod';
import mongoose from 'mongoose';

export const genericErrorResponse = z.object({
  error: z.string(),
});

export const schemaValidationErrorResponse = z.object({
  errors: z.string().array(),
});

export const idValidation = z.object({
  id: z
    .string({ message: 'o campo id precisa ser uma string' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), 'id inválido'),
});
