/*
  Warnings:

  - Added the required column `complete` to the `Scraper` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scraper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteUrl" TEXT NOT NULL,
    "scrapedLinks" TEXT,
    "complete" BOOLEAN NOT NULL
);
INSERT INTO "new_Scraper" ("id", "scrapedLinks", "websiteUrl") SELECT "id", "scrapedLinks", "websiteUrl" FROM "Scraper";
DROP TABLE "Scraper";
ALTER TABLE "new_Scraper" RENAME TO "Scraper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
