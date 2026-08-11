/*
  Warnings:

  - Added the required column `courseId` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LessonProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LessonProgress" ("completedAt", "id", "lessonId", "userId") SELECT "completedAt", "id", "lessonId", "userId" FROM "LessonProgress";
DROP TABLE "LessonProgress";
ALTER TABLE "new_LessonProgress" RENAME TO "LessonProgress";
CREATE INDEX "LessonProgress_userId_courseId_idx" ON "LessonProgress"("userId", "courseId");
CREATE UNIQUE INDEX "LessonProgress_userId_courseId_lessonId_key" ON "LessonProgress"("userId", "courseId", "lessonId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
