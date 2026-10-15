"use client"

import {
  Copy01Icon,
  Download04Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"
import type { ExportFile } from "@/lib/export"
import { highlight, type TokenKind } from "@/lib/highlight"

const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: "",
  comment: "text-(--syntax-comment) italic",
  keyword: "text-(--syntax-keyword)",
  property: "text-(--syntax-property)",
  key: "text-(--syntax-property)",
  string: "text-(--syntax-string)",
  number: "text-(--syntax-number)",
  color: "text-(--syntax-number)",
}

function download({ filename, code }: ExportFile) {
  const url = URL.createObjectURL(new Blob([code], { type: "text/plain" }))
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function CodeBlock({ file }: { file: ExportFile }) {
  const { copied, copy } = useCopy()
  const tokens = useMemo(() => highlight(file.code), [file.code])

  return (
    <div className="overflow-hidden rounded-[10px] border bg-card">
      <div className="flex items-center gap-1 border-b bg-muted/50 py-2 pr-2 pl-4">
        <span className="mr-auto truncate font-mono text-[13px] text-muted-foreground">
          {file.filename}
        </span>
        <Button
          variant="ghost"
          onClick={() => copy(file.code, "all", file.filename)}
        >
          <HugeiconsIcon
            icon={copied ? Tick02Icon : Copy01Icon}
            data-icon="inline-start"
            className="text-muted-foreground"
          />
          {copied ? "Copied" : "Copy code"}
        </Button>
        <Button
          variant="ghost"
          aria-label={`Download ${file.filename}`}
          onClick={() => download(file)}
        >
          <HugeiconsIcon
            icon={Download04Icon}
            data-icon="inline-start"
            className="text-muted-foreground"
          />
          <span className="max-sm:sr-only">Download file</span>
        </Button>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${file.filename} contents`}
        className="max-h-[420px] overflow-auto p-4 font-mono text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
      >
        <code>
          {tokens.map((t, i) =>
            t.kind === "color" ? (
              <span key={i} className={TOKEN_CLASS.color}>
                <span
                  aria-hidden
                  className="mr-1 inline-block size-2.5 rounded-[3px] align-[-1px] ring-1 ring-foreground/15"
                  style={{ background: t.text }}
                />
                {t.text}
              </span>
            ) : (
              <span key={i} className={TOKEN_CLASS[t.kind]}>
                {t.text}
              </span>
            )
          )}
        </code>
      </pre>
    </div>
  )
}
