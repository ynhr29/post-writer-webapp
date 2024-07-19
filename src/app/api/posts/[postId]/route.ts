import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { postPatchSchema } from "@/lib/varidations/post"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// zodで[postId]を取得
const routeContextSchema = z.object({
  params: z.object({ postId: z.string() }),
})

// /api/posts/[postId]
export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json("権限がなりリソースです", { status: 403 })
    }

    const json = await req.json()
    const body = postPatchSchema.parse(json)

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }
    return NextResponse.json("不明なエラーが発生しました", { status: 500 })
  }
}

// ユーザの記事かチェック
async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.post.count({
    where: {
      id: postId,
      authoId: session?.user.id,
    },
  })
  return count > 0
}
