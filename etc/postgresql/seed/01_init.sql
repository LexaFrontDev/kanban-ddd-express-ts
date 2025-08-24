CREATE TABLE "User" (
                        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        "name" TEXT NOT NULL,
                        "email" TEXT UNIQUE NOT NULL,
                        "password" TEXT NOT NULL,
                        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
