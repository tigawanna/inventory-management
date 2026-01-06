import { Elysia, t } from "elysia";

// Define reusable models for better OpenAPI documentation
const UserModels = new Elysia().model({
  SignInRequest: t.Object(
    {
      username: t.String({
        minLength: 3,
        maxLength: 50,
        description: 'Username for authentication',
      }),
      password: t.String({
        minLength: 8,
        description: 'User password (at least 8 characters)',
      }),
    },
    {
      description: 'Sign in credentials',
    }
  ),
  SignUpRequest: t.Object(
    {
      username: t.String({
        minLength: 3,
        maxLength: 50,
        description: 'Desired username',
      }),
      email: t.String({
        format: 'email',
        description: 'User email address',
      }),
      password: t.String({
        minLength: 8,
        description: 'User password (at least 8 characters)',
      }),
    },
    {
      description: 'Sign up information',
    }
  ),
  AuthResponse: t.Object(
    {
      token: t.String({
        description: 'JWT authentication token',
      }),
      user: t.Object({
        id: t.String({
          description: 'User unique identifier',
        }),
        username: t.String({
          description: 'Username',
        }),
        email: t.String({
          description: 'User email',
        }),
      }),
    },
    {
      description: 'Authentication response with token and user details',
    }
  ),
  UserProfile: t.Object(
    {
      id: t.String({
        description: 'User unique identifier',
      }),
      username: t.String({
        description: 'Username',
      }),
      email: t.String({
        description: 'User email',
      }),
      createdAt: t.String({
        format: 'date-time',
        description: 'Account creation timestamp',
      }),
    },
    {
      description: 'User profile information',
    }
  ),
  ErrorResponse: t.Object(
    {
      error: t.String({
        description: 'Error message',
      }),
      statusCode: t.Number({
        description: 'HTTP status code',
      }),
    },
    {
      description: 'Error response',
    }
  ),
});

export const users = new Elysia({ 
  prefix: "/user",
  // Apply tags to entire group
  tags: ['User']
})
  .use(UserModels)
  .post(
    "/sign-in",
    ({ body }) => {
      // Implementation placeholder
      return {
        token: 'example-jwt-token',
        user: {
          id: '1',
          username: body.username,
          email: 'user@example.com'
        }
      };
    },
    {
      body: 'SignInRequest',
      response: {
        200: 'AuthResponse',
        401: 'ErrorResponse',
      },
      detail: {
        summary: 'User Sign In',
        description: 'Authenticate a user with username and password',
        tags: ['Authentication'],
        responses: {
          200: {
            description: 'Successfully authenticated',
          },
          401: {
            description: 'Invalid credentials',
          },
        },
      },
    }
  )
  .post(
    "/sign-up",
    ({ body }) => {
      // Implementation placeholder
      return {
        token: 'example-jwt-token',
        user: {
          id: '1',
          username: body.username,
          email: body.email
        }
      };
    },
    {
      body: 'SignUpRequest',
      response: {
        201: 'AuthResponse',
        400: 'ErrorResponse',
        409: 'ErrorResponse',
      },
      detail: {
        summary: 'User Sign Up',
        description: 'Register a new user account',
        tags: ['Authentication'],
        responses: {
          201: {
            description: 'User successfully registered',
          },
          400: {
            description: 'Invalid input data',
          },
          409: {
            description: 'Username or email already exists',
          },
        },
      },
    }
  )
  .get(
    "/profile",
    () => {
      // Implementation placeholder
      return {
        id: '1',
        username: 'example-user',
        email: 'user@example.com',
        createdAt: new Date().toISOString()
      };
    },
    {
      response: {
        200: 'UserProfile',
        401: 'ErrorResponse',
      },
      detail: {
        summary: 'Get User Profile',
        description: 'Retrieve the authenticated user\'s profile information',
        tags: ['User'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'User profile retrieved successfully',
          },
          401: {
            description: 'Authentication required',
          },
        },
      },
    }
  );
