"use client"

import { Alert02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo, useState } from "react"

import { Section } from "@/components/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useColorSystem } from "@/hooks/use-color-system"
import {
  checkContrast,
  type ContrastCheck,
  type ContrastResult,
} from "@/lib/modules/color"
import { cn } from "@/lib/utils"

type Filter = "all" | "fail"

const SEGMENT =
  "h-7 px-2.5 font-normal hover:bg-background/60 aria-pressed:bg-background aria-pressed:font-medium aria-pressed:shadow-xs"

const fails = (c: ContrastCheck) => !c.light.pass || !c.dark.pass

/** "AAA", "AA", "AA large only" or "Fail" for text; "Pass"/"Fail" for UI. */
function rating(r: ContrastResult, min: number) {
  if (min === 3) return r.pass ? "Pass" : "Fail"
  if (r.ratio >= 7) return "AAA"
  if (r.ratio >= 4.5) return "AA"
  if (r.ratio >= 3) return "AA large only"
  return "Fail"
}

/**
 * Every foreground/background pair the components draw, checked in light and
 * dark (PRD v1.1 contrast warnings), with a filter for the failing ones.
 */
export function ContrastSection() {
  const system = useColorSystem()
  const checks = useMemo(() => checkContrast(system), [system])
  const [filter, setFilter] = useState<Filter>("all")
  const failed = checks.reduce(
    (n, c) => n + Number(!c.light.pass) + Number(!c.dark.pass),
    0
  )
  const ok = failed === 0
  const shown = filter === "fail" ? checks.filter(fails) : checks

  return (
    <Section
      id="contrast"
      title="Contrast"
      description="Each text and focus color against what it sits on, checked against WCAG AA in light and dark."
      action={
        <ToggleGroup
          aria-label="Show"
          value={[filter]}
          onValueChange={(next) => {
            if (next.length > 0) setFilter(next[0] as Filter)
          }}
          className="gap-1 rounded-[10px] bg-muted p-1"
        >
          <ToggleGroupItem value="all" className={SEGMENT}>
            All pairs
          </ToggleGroupItem>
          <ToggleGroupItem value="fail" className={SEGMENT}>
            Failing only
          </ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <p
        role="status"
        className={cn(
          "flex items-start gap-2.5 rounded-[10px] px-4 py-3 text-sm",
          ok ? "bg-(--status-ok)/8" : "bg-destructive/8"
        )}
      >
        <HugeiconsIcon
          icon={ok ? CheckmarkCircle02Icon : Alert02Icon}
          className={cn(
            "mt-0.5 size-4 shrink-0",
            ok ? "text-(--status-ok)" : "text-destructive"
          )}
        />
        <span>
          <span className="font-semibold">
            {ok
              ? `All ${checks.length} pairs pass`
              : `${failed} of ${checks.length * 2} checks fail`}
          </span>{" "}
          <span className="text-muted-foreground">
            {ok ? "in light and dark." : "Adjust the flagged colors below."}
          </span>
        </span>
      </p>

      {shown.length === 0 ? (
        <p className="rounded-[10px] border px-4 py-6 text-center text-sm text-muted-foreground">
          No failing pairs.
        </p>
      ) : (
        <>
          {/* Phones: one block per pair, so both results stay on screen. */}
          <ul className="flex flex-col divide-y rounded-[10px] border sm:hidden">
            {shown.map((c) => (
              <li key={c.id} className="flex flex-col gap-3 p-4">
                <PairName check={c} />
                <span className="grid grid-cols-2 gap-3">
                  {(["light", "dark"] as const).map((mode) => (
                    <span key={mode} className="flex flex-col gap-1.5">
                      <span className="text-[13px] text-muted-foreground capitalize">
                        {mode}
                      </span>
                      <Result check={c} result={c[mode]} />
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto rounded-[10px] border sm:block">
            <Table className="min-w-160">
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-10 pl-4 text-muted-foreground">
                    Pair
                  </TableHead>
                  <TableHead className="h-10 w-50 text-muted-foreground">
                    Light
                  </TableHead>
                  <TableHead className="h-10 w-50 pr-4 text-muted-foreground">
                    Dark
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="py-3 pl-4">
                      <PairName check={c} />
                    </TableCell>
                    <TableCell className="py-3">
                      <Result check={c} result={c.light} />
                    </TableCell>
                    <TableCell className="py-3 pr-4">
                      <Result check={c} result={c.dark} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </Section>
  )
}

function PairName({ check }: { check: ContrastCheck }) {
  return (
    <span className="flex flex-col">
      <span className="text-sm font-medium">{check.label}</span>
      <span className="font-mono text-[13px] break-all text-muted-foreground">
        {check.fg} on {check.bg}
      </span>
    </span>
  )
}

function Result({
  check,
  result,
}: {
  check: ContrastCheck
  result: ContrastResult
}) {
  // The focus ring isn't text: sample it as a ring inside the fill.
  const ring = check.min === 3
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-lg text-sm font-semibold ring-1 ring-foreground/10 ring-inset"
        style={{
          background: result.bg,
          color: result.fg,
          ...(ring && {
            boxShadow: `inset 0 0 0 5px ${result.bg}, inset 0 0 0 7px ${result.fg}`,
          }),
        }}
      >
        {!ring && "Aa"}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium tabular-nums">
          {result.ratio.toFixed(2)}:1
        </span>
        <span
          className={cn(
            "text-[13px] font-medium",
            result.pass ? "text-muted-foreground" : "text-destructive"
          )}
        >
          {rating(result, check.min)}
        </span>
      </span>
    </span>
  )
}
