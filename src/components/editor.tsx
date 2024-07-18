"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import TextareaAutosize from "react-textarea-autosize"
import EditorJS from "@editorjs/editorjs"
import { useCallback, useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import LinkTool from "@editorjs/link"
import List from "@editorjs/list"
import CodeTool from "@editorjs/code"

export default function Editor() {
  const ref = useRef<EditorJS>()
  const [isMounted, setisMounted] = useState<boolean>(false)

  // useCallbackでメモ化
  const initializeEditor = useCallback(async () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor
      },
      placeholder: "ここに記事を書く",
      inlineToolbar: true,
      tools: {
        header: Header,
        linkTool: LinkTool,
        list: List,
        code: CodeTool,
      },
    })
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setisMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()
    }

    // ページを閉じたときにクリーンアップする
    return () => {
      ref.current?.destroy()
      ref.current = undefined
    }
  }, [isMounted, initializeEditor])

  return (
    <form>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              戻る
            </Link>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <Button type="submit">
            <span>保存</span>
          </Button>
        </div>
        <div className="w-[800px] mx-auto">
          <TextareaAutosize
            id="title"
            autoFocus
            placeholder="Post Title"
            className="w-full resize-none overflow-hidden bg-transparent text-5xl focus:outline-none font-bold"
          />
        </div>
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Use
          <kbd className="rounded-md border bg-muted px-1 text-sx uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
      </div>
    </form>
  )
}
