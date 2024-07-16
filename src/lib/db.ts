import { PrismaClient } from "@prisma/client"

declare global {
  var cachePrisma: PrismaClient
}

let prisma: PrismaClient

// 商用環境ならインスタンス1回生成
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // 開発環境ならホットリロード時などにprismaClientがない場合はインスタンス生成
  if (!global.cachePrisma) {
    global.cachePrisma = new PrismaClient()
  }
  prisma = global.cachePrisma
}

export const db = prisma
