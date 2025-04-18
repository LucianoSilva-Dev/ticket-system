// zod schemas for validation and response of the routes
import type { EntitySchema } from '../../shared/Types';
import {
  genericErrorResponse,
  schemaValidationErrorResponse,
} from '../../shared/Validations';

import {
  postRegisterAuthBodyValidation,
  getTokenAuthBodyValidation,
  tokenResponse,
  userRegisterResponse,
} from './Validations';

export const AuthSchema: EntitySchema = {
  getToken: {
    schema: {
      body: getTokenAuthBodyValidation,
      response: {
        200: tokenResponse,
        400: schemaValidationErrorResponse,
        401: genericErrorResponse,
        500: genericErrorResponse,
      },
      summary: 'Get the JWT token',
    },
  },

  register: {
    schema: {
      body: postRegisterAuthBodyValidation,
      response: {
        201: userRegisterResponse,
        400: schemaValidationErrorResponse,
        404: genericErrorResponse,
        500: genericErrorResponse,
      },
      summary: 'Register a new user',
    },
  },
};
