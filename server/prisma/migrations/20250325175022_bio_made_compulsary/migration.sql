/*
  Warnings:

  - Made the column `bio` on table `Freelancer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Freelancer" ALTER COLUMN "bio" SET NOT NULL;
