``` php
src/
│
├── app.module.ts
├── main.ts
│
├── common/ # Shared utilities, DTOs, guards, filters, pipes, interceptors, decorators
│ ├── decorators/
│ ├── dtos/
│ ├── filters/
│ ├── guards/
│ ├── interceptors/
│ ├── pipes/
│ └── utils/
│
├── config/ # Configuration files and modules
│ ├── config.module.ts
│ └── config.service.ts
│
├── core/ # Core modules (global services, middleware, etc.)
│ ├── middleware/
│ ├── services/
│ └── core.module.ts
│
├── modules/ # Feature modules
│ ├── users/
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── users.controller.ts
│ │ ├── users.module.ts
│ │ ├── users.service.ts
│ │ └── users.repository.ts
│ │
│ ├── auth/
│ │ ├── dto/
│ │ ├── guards/
│ │ ├── auth.controller.ts
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ ├── auth.strategy.ts
│ │ └── auth.repository.ts
│ │
│ └── other-modules/
│
├── shared/ # Shared resources (models, enums, interfaces)
│ ├── interfaces/
│ ├── enums/
│ └── models/
│
└── infrastructure/ # External services, database connections, etc.
├── database/
│ ├── database.module.ts
│ ├── database.service.ts
│ └── entities/
│
└── other-services/
```