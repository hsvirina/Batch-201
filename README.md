# Batch-201 API

A full-featured REST API for managing wines, user authentication, favourites, and shopping cart.  
Built with **NestJS**, **Prisma ORM**, and **JWT authentication**, following best practices for API design.

---

## Features

- ✅ User registration and login with hashed passwords (bcrypt)
- ✅ JWT authentication with refresh tokens
- ✅ User profile management
- ✅ Wine catalogue with detailed metadata
- ✅ Favourites management (add, remove, list)
- ✅ Shopping cart with quantity management and upsert logic
- ✅ Best practices implemented:
  - DTOs for request/response validation
  - Global validation pipe for input sanitization
  - Centralized logging with NestJS Logger
  - Environment variables managed via NestJS ConfigModule

---

## Tech Stack

- [NestJS](https://nestjs.com/) - Node.js framework for building scalable and modular server-side applications
- [Prisma](https://www.prisma.io/) - ORM for PostgreSQL, handling database queries and schema
- [JWT](https://jwt.io/) - Authentication with access and refresh tokens
- TypeScript & Node.js
- PostgreSQL

---

## Architecture

root/
│
├─ src/
│  ├─ main.ts               # Application entry point
│  ├─ app.module.ts         # Root module
│  │
│  ├─ prisma/               # Prisma database client
│  │  ├─ prisma.module.ts
│  │  └─ prisma.service.ts
│  │
│  ├─ modules/              # Feature modules
│  │  ├─ auth/              # Authentication (register, login, JWT)
│  │  ├─ user/              # User management
│  │  │  ├─ favourites/     # User favourites functionality
│  │  │  └─ cart/           # Shopping cart functionality
│  │  └─ wine/              # Wine catalogue management
│
├─ prisma/
│  └─ schema.prisma         # Database schema
│
├─ package.json
├─ tsconfig.json
└─ README.md
