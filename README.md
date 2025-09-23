
# Bank API

A robust and scalable API built with [NestJS](https://nestjs.com/), TypeScript, and TypeORM, designed for managing users, accounts, bank operations, and transactions.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Deployment](#deployment)
- [Resources](#resources)
- [Support](#support)
- [License](#license)

---

## Description

This project is a TypeScript-based API using the NestJS framework. It provides a complete solution for user management, authentication, account operations, and banking transactions. The architecture is modular, making it easy to extend and maintain.

---

## Features

- **User Management:**  
  - User registration and authentication (JWT-based)
  - Secure password storage
  - User profile management

- **Account Management:**  
  - Create, retrieve, and close accounts
  - Deposit and withdraw funds
  - Account balance tracking
  - Account status (active/closed) management

- **Bank Operations:**  
  - Bank account entity management
  - Transactional operations with rollback support for tests

- **Transactions:**  
  - Record and retrieve transaction history
  - Ensure atomicity and consistency using transactional context

- **Authentication & Authorization:**  
  - JWT authentication for all protected routes
  - Role-based access control (if implemented)

- **Testing:**  
  - Unit and E2E tests with isolated database using transactional context
  - Utilities for sandboxed test execution

- **Configuration:**  
  - Centralized configuration module
  - Environment variable support

- **Database:**  
  - TypeORM integration (MySQL)
  - Auto schema synchronization for development and testing
  - Migration support

---

## Project Structure

```
src/
  account/         # Account controllers, services, entities, repositories
  auth/            # Authentication logic and JWT handling
  bank/            # Bank account logic
  transaction/     # Transaction logic
  user/            # User logic
  config/          # App configuration module
test/              # E2E and utility tests
migrations/        # Database migrations
```

---

## Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+ recommended)
- [Docker](https://www.docker.com/) for running MySQL locally

---

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/test-api.git
   cd test-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Running the Project

`The project will run at port 3001`
### Documentation

```
 http://localhost:3001/docs
```


### Development

```bash
 docker compose up -d && docker logs --tail 100 -f test-api-sfox
```

OR

```bash
 make up
```

## Testing

### Unit Tests

```bash
npm run test
```

### End-to-End (E2E) Tests

```bash
npm run test:e2e
```

#### Notes

- E2E tests use a dedicated database (`e2e-test-api-sfox`) and transactional context for isolation.
- All test data is rolled back after each test using the `runInSandbox` utility.



## Support

Nest is an MIT-licensed open source project. It grows thanks to sponsors and backers.  
[Read more here](https://docs.nestjs.com/support).

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).