import type { Controller, GenericErrorResponse, SchemaValidationErrorResponse } from '../../shared/Types';
import type {
  getTokenAuthBody,
  registerAuthBody,
  TokenResponse,
  UserRegisterResponse,
} from './Types';
import { AuthService } from './Service';

export const AuthController: Controller = {
  getToken: async (request, reply) => {
    const response = await AuthService.getToken(
      request.body as getTokenAuthBody,
      reply,
    );
    if (!response.auth) {
      const genericErrorResponse: GenericErrorResponse = {
        error: 'Invalid credentials',
      };
      return reply.status(401).send(genericErrorResponse);
    }
    const tokenResponse: TokenResponse = {
      token: response.token as string,
    };
    return reply.status(200).send(tokenResponse);
  },

  register: async (request, reply) => {
    const response = await AuthService.register(
      request.body as registerAuthBody,
    );
    if (!response.success) {
      const genericErrorResponse: GenericErrorResponse = {
        error: response.error as string,
      };
      return reply
        .status(response.statusCode as number)
        .send(genericErrorResponse);
    }

    const userRegisterResponse: UserRegisterResponse = {
      message: response.message as string,
    };
    return reply.status(201).send(userRegisterResponse);
  },
};
