/*
  Warnings:

  - Added the required column `country` to the `Freelancer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `title` on the `Freelancer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('WEB_DEVELOPMENT', 'MOBILE_APP_DEVELOPMENT', 'FRONTEND_DEVELOPMENT', 'BACKEND_DEVELOPMENT', 'FULLSTACK_DEVELOPMENT', 'BLOCKCHAIN_DEVELOPMENT', 'GAME_DEVELOPMENT', 'DEVOPS_CLOUD_INFRASTRUCTURE', 'DATA_SCIENCE_MACHINE_LEARNING', 'AI_DEVELOPMENT', 'CYBERSECURITY', 'EMBEDDED_SYSTEMS', 'UI_UX_DESIGN');

-- AlterTable
ALTER TABLE "Freelancer" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT,
DROP COLUMN "title",
ADD COLUMN     "title" "Domain" NOT NULL;

-- CreateTable
CREATE TABLE "FreelancerExpectation" (
    "id" SERIAL NOT NULL,
    "point" TEXT NOT NULL,
    "freelancerId" INTEGER NOT NULL,

    CONSTRAINT "FreelancerExpectation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelancerProject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectUrl" TEXT,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "freelancerId" INTEGER NOT NULL,

    CONSTRAINT "FreelancerProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelancerProjectTool" (
    "id" SERIAL NOT NULL,
    "tool" TEXT NOT NULL,
    "freelancerProjectId" INTEGER NOT NULL,

    CONSTRAINT "FreelancerProjectTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelancerLanguage" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "freelancerId" INTEGER NOT NULL,

    CONSTRAINT "FreelancerLanguage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FreelancerExpectation" ADD CONSTRAINT "FreelancerExpectation_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelancerProject" ADD CONSTRAINT "FreelancerProject_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelancerProjectTool" ADD CONSTRAINT "FreelancerProjectTool_freelancerProjectId_fkey" FOREIGN KEY ("freelancerProjectId") REFERENCES "FreelancerProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelancerLanguage" ADD CONSTRAINT "FreelancerLanguage_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
