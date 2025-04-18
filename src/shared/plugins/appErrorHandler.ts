import type { FastifyInstance } from 'fastify';
import {
  AppError,
  SchemaValidationError,
  ResponseValidationError,
} from '../Errors';
import type { FastifySchemaValidationError } from 'fastify/types/schema';
import type {
  GenericErrorResponse,
  SchemaValidationErrorResponse,
} from '../Types';

const mapErrorMessage = (errors: FastifySchemaValidationError[]) => {
  return errors.map((error) => error.message || 'unknown error');
};

export const appErrorHandler: FastifyInstance['errorHandler'] = (
  error: unknown,
  request,
  reply,
) => {
  if (error instanceof AppError) {
    const genericErrorResponse: GenericErrorResponse = {
      error: error.error as string,
    };
    return reply.status(error.statusCode).send(genericErrorResponse);
  }
  if (error instanceof SchemaValidationError) {
    const schemaValidationErrorResponse: SchemaValidationErrorResponse = {
      errors: mapErrorMessage(error.errors),
    };
    return reply.status(error.statusCode).send(schemaValidationErrorResponse);
  }
  if (error instanceof ResponseValidationError) {
    const genericErrorResponse: GenericErrorResponse = {
      error: error.message as string,
    };
    return reply.status(500).send(genericErrorResponse);
  }

  console.log('Erro generico capturado');
  console.error(error);
  const genericErrorResponse: GenericErrorResponse = {
    error: 'Internal Server Error',
  };
  reply.status(500).send(genericErrorResponse);
};
