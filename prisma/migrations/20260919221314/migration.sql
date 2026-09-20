-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PermissionAction" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "RoleType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_photos" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "settingid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frame_templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "settingid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "frame_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_sessions" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "settingid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photo_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_results" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sessionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photo_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_settings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "websiteName" TEXT NOT NULL DEFAULT 'Bingkai',
    "websiteDescription" TEXT,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#B89B5E',
    "secondaryColor" TEXT NOT NULL DEFAULT '#1E1E1E',
    "backgroundColor" TEXT NOT NULL DEFAULT '#F5F0E8',
    "surfaceColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "textColor" TEXT NOT NULL DEFAULT '#222222',
    "accentColor" TEXT NOT NULL DEFAULT '#D4AF6A',
    "photoPrice" INTEGER NOT NULL DEFAULT 25000,
    "photoCount" INTEGER NOT NULL DEFAULT 6,
    "countdown" INTEGER NOT NULL DEFAULT 5,
    "maxTime" INTEGER NOT NULL DEFAULT 120,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "photo_sessions_sessionId_key" ON "photo_sessions"("sessionId");

-- CreateIndex
CREATE INDEX "photo_results_sessionId_idx" ON "photo_results"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "website_settings_userId_key" ON "website_settings"("userId");

-- AddForeignKey
ALTER TABLE "landing_photos" ADD CONSTRAINT "landing_photos_settingid_fkey" FOREIGN KEY ("settingid") REFERENCES "website_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frame_templates" ADD CONSTRAINT "frame_templates_settingid_fkey" FOREIGN KEY ("settingid") REFERENCES "website_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_sessions" ADD CONSTRAINT "photo_sessions_settingid_fkey" FOREIGN KEY ("settingid") REFERENCES "website_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_results" ADD CONSTRAINT "photo_results_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "photo_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_settings" ADD CONSTRAINT "website_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
