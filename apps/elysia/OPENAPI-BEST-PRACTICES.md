# OpenAPI Best Practices Implementation

This document outlines the OpenAPI best practices implemented in this Elysia application, based on the official [Elysia OpenAPI documentation](https://elysiajs.com/patterns/openapi.html).

## ✅ Implemented Best Practices

### 1. Type Generation from Exported Instance

**Why:** Elysia can generate OpenAPI documentation from TypeScript types by reading exported instances.

**Implementation:**
```typescript
// Export the app instance
export const app = new Elysia({ adapter: node() })
  .use(openapi({
    references: fromTypes('src/main.ts')
  }))
```

**Benefit:** Better type safety and automatic documentation generation from your TypeScript types.

---

### 2. Environment-Aware Type References

**Why:** In production, compiled apps use `.d.ts` files instead of source `.ts` files.

**Implementation:**
```typescript
references: fromTypes(
  process.env.NODE_ENV === 'production'
    ? 'dist/main.d.ts'
    : 'src/main.ts'
)
```

**Benefit:** Prevents runtime errors when deploying compiled applications.

---

### 3. Comprehensive Documentation Configuration

**Why:** Provides context and organization for API consumers.

**Implementation:**
```typescript
documentation: {
  info: {
    title: 'Inventory Management API',
    version: '1.0.0',
    description: 'A comprehensive inventory management system...',
  },
  tags: [
    { name: 'General', description: '...' },
    { name: 'Authentication', description: '...' },
    { name: 'User', description: '...' },
  ]
}
```

**Benefit:** Clear, organized API documentation with logical groupings.

---

### 4. Reusable Schema Models

**Why:** Avoids code duplication and ensures consistency across endpoints.

**Implementation:**
```typescript
const UserModels = new Elysia().model({
  SignInRequest: t.Object({ /* ... */ }),
  AuthResponse: t.Object({ /* ... */ }),
  ErrorResponse: t.Object({ /* ... */ }),
});

// Usage in routes
.post('/sign-in', handler, {
  body: 'SignInRequest',
  response: {
    200: 'AuthResponse',
    401: 'ErrorResponse',
  }
})
```

**Benefit:** DRY principle, type reusability, and automatic schema references in OpenAPI docs.

---

### 5. Detailed Route Descriptions

**Why:** Makes the API self-documenting and easier to understand.

**Implementation:**
```typescript
{
  detail: {
    summary: 'User Sign In',
    description: 'Authenticate a user with username and password',
    tags: ['Authentication'],
    responses: {
      200: { description: 'Successfully authenticated' },
      401: { description: 'Invalid credentials' },
    },
  }
}
```

**Benefit:** Clear documentation for each endpoint with expected responses.

---

### 6. Security Scheme Configuration

**Why:** Documents authentication requirements and allows testing with authentication in Swagger UI.

**Implementation:**
```typescript
components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT Bearer token authentication'
    },
  },
}

// Applied to specific routes
detail: {
  security: [{ bearerAuth: [] }]
}
```

**Benefit:** Clear authentication documentation and testing capabilities.

---

### 7. Validation with Descriptions

**Why:** Provides inline documentation and validation constraints.

**Implementation:**
```typescript
password: t.String({
  minLength: 8,
  description: 'User password (at least 8 characters)',
})
```

**Benefit:** Self-documenting validation rules that appear in OpenAPI docs.

---

### 8. Multiple Response Status Codes

**Why:** Documents all possible outcomes of an endpoint.

**Implementation:**
```typescript
response: {
  201: 'AuthResponse',
  400: 'ErrorResponse',
  409: 'ErrorResponse',
}
```

**Benefit:** Complete API contract documentation.

---

### 9. Group-Level Tags

**Why:** Automatically applies tags to all routes in a group.

**Implementation:**
```typescript
export const users = new Elysia({ 
  prefix: "/user",
  tags: ['User']
})
```

**Benefit:** Consistent tagging without repeating configuration.

---

## 🛡️ Caveats Addressed

### 1. Production Type Generation

**Caveat:** Compiled apps can't reference source `.ts` files.

**Solution:** Environment-aware type path selection:
```typescript
process.env.NODE_ENV === 'production' ? 'dist/main.d.ts' : 'src/main.ts'
```

---

### 2. Response Header Documentation

**Caveat:** `withHeader` is annotation-only and doesn't enforce headers.

**Awareness:** When using `withHeader`, remember to manually set headers in the handler:
```typescript
({ set }) => {
  set.headers['x-powered-by'] = 'Elysia';
  return response;
}
```

---

### 3. Export Instance Requirement

**Caveat:** Type generation requires an exported instance.

**Solution:** Always export the main app instance:
```typescript
export const app = new Elysia()...
```

---

## 📋 Additional Recommendations

### Future Enhancements

1. **Hide Internal Routes**
   - Use `detail: { hide: true }` for internal/admin-only endpoints
   
2. **Response Headers Documentation**
   - Use `withHeader()` for endpoints that return custom headers

3. **Custom Schema Mappers**
   - If using Zod or other schema libraries, provide `mapJsonSchema`

4. **Guard Descriptions**
   - Add descriptions to guards for better documentation:
   ```typescript
   .guard({
     detail: {
       description: 'Require user to be logged in'
     }
   })
   ```

5. **OpenAPI Endpoint Customization**
   - Change default `/swagger` path if needed:
   ```typescript
   openapi({
     path: '/v2/openapi'
   })
   ```

---

## 🚀 Usage

1. Start the dev server: `npm run dev`
2. Access OpenAPI docs: `http://localhost:4000/swagger`
3. Build for production: `npm run build`
4. Run production: `npm start`

---

## 📚 References

- [Elysia OpenAPI Patterns](https://elysiajs.com/patterns/openapi.html)
- [Elysia OpenAPI Plugin](https://elysiajs.com/plugins/openapi.html)
- [Elysia Validation](https://elysiajs.com/essential/validation.html)
