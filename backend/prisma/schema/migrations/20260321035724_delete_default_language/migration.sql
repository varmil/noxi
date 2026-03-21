/*
  Warnings:

  - You are about to drop the column `defaultLanguage` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `defaultLanguage` on the `ChannelRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "defaultLanguage";

-- AlterTable
ALTER TABLE "ChannelRegistration" DROP COLUMN "defaultLanguage";
