"use client"

import { useState } from "react"
import { Button, ButtonProps } from "./ui/button"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"

interface PostCreateButtonProps extends ButtonProps {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response.ok) {
      return toast({
        title: "問題が発生しました",
        description: "投稿の作成に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    }

    const post = await response.json()

    // toast({
    //   title: "Untitled Postの作成に成功しました",
    //   description: "続けてPostの詳細を入力してください",
    //   variant: "default",
    // })

    router.refresh()
    router.push(`editor/${post.id}`)
  }

  return (
    <Button
      onClick={onClick}
      className={cn({ "cursor-not-allowed opacity-60": isLoading }, className)}
      variant={variant}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.spinner className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Icon.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </Button>
  )
}
