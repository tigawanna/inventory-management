# Evaluation Test: Inventory Management System

## Objective
Create a comprehensive Inventory Management System that combines both backend and frontend operations. The system should allow users to perform essential inventory tasks such as adding, modifying, viewing, and removing items. This project aims to assess your abilities in developing backend and frontend components, designing APIs, integrating databases, implementing authentication, and crafting an intuitive user interface.

## Requirements

### 1. General Requirements
1. Use Node.js with Express for the backend (TypeScript)
2. Use React.js for the frontend (TypeScript)
3. Database: PostgreSQL
4. Implement JWT authentication for secure access
5. Containerize the application using Docker

### 2. Backend Features

#### User Authentication and Authorization
- JWT Authentication with role-based access functionality
  - Implement two roles: `admin` and `user`
  - Admins can perform all CRUD operations, while regular users can only view items
  - Implement authorization middleware to ensure correct endpoint access
  - JWT should include user's role and be verified on each request
- Account Activation: Implement email verification for account activation

#### API Endpoints
1. **POST /api/items**
   - Validate fields: `name`, `quantity`, `price` with custom error messages
   - Ensure valid `category` from predefined set

2. **GET /api/items**
   - Implement pagination and sorting (by name, price, or quantity)
   - Allow filtering by category, price range, or name
   - Implement rate-limiting

3. **GET /api/items/:id**
   - Include item not found and server error responses
   - Log and track access for auditing

4. **PUT /api/items/:id**
   - Allow updates to specific fields only
   - Implement change tracking system

5. **DELETE /api/items/:id**
   - Implement soft delete functionality
   - Restrict permanent deletion to admins only

#### Audit Logging
- Track user actions with detailed audit trail

#### API Documentation
- Use Swagger/OpenAPI
- Include comprehensive documentation
- Provide authentication examples

### 3. Frontend Features

#### Authentication Pages
- Login and Registration with email validation
- Password reset functionality
- Strong password requirements
- Loading indicators

#### Dashboard
- Enhanced paginated list with sorting/filtering
- Client-side pagination
- Category and price range filters
- Loading states

#### CRUD Functionality
1. **Add Item Form**
   - Field validation
   - Real-time validation
   - Error feedback

2. **Edit Item**
   - Pre-filled forms
   - Loading indicators
   - Update confirmation

3. **Delete Item**
   - Confirmation dialog
   - Success/error messages

4. **Item Details**
   - Modal window display
   - Edit/delete options

#### UI Design
- TailwindCSS implementation
- Responsive design
- Light/Dark mode toggle
- Accessible layout

#### Error Handling
- User-friendly error messages
- Global error boundary
- Comprehensive form validation

### Technical Requirements
1. Modular, DRY, and well-commented code
2. Git version control
3. Environment variable management
4. Unit testing
5. Deployment (Render, Vercel, or Heroku)

### Submission Details
1. GitHub repository with:
   - Complete source code
   - Detailed README.md
2. Live deployment URL

### Evaluation Criteria
1. Functionality
2. Code Quality
3. UI/UX Design
4. Error Handling
5. Documentation
6. Testing

### Notes
- Handle edge cases
- Follow industry standards
- Implement best practices
