import { describe, expect, it } from "vitest"

import {
  emptyHistory,
  HISTORY_LIMIT,
  record,
  redo,
  undo,
} from "@/lib/tokens/history"

describe("settings history", () => {
  it("undoes and redoes separate changes", () => {
    let h = emptyHistory<string>()
    h = record(h, "a", 0) // a → b
    h = record(h, "b", 1000) // b → c
    const u1 = undo(h, "c")!
    expect(u1.state).toBe("b")
    const u2 = undo(u1.history, u1.state)!
    expect(u2.state).toBe("a")
    expect(undo(u2.history, u2.state)).toBeNull()
    const r1 = redo(u2.history, u2.state)!
    expect(r1.state).toBe("b")
    expect(redo(r1.history, r1.state)!.state).toBe("c")
  })

  it("groups a continuous edit into one step", () => {
    let h = emptyHistory<number>()
    for (let t = 0; t <= 2000; t += 16) h = record(h, t, t) // a 2s drag
    expect(h.past).toEqual([0])
    expect(undo(h, 2016)!.state).toBe(0)
  })

  it("starts a new step after a pause, or when forced", () => {
    let h = emptyHistory<string>()
    h = record(h, "a", 0)
    h = record(h, "b", 100) // still the same edit
    h = record(h, "c", 700) // after a pause
    h = record(h, "d", 750, true) // a preset: always its own step
    h = record(h, "e", 760) // and the next change isn't merged into it
    expect(h.past).toEqual(["a", "c", "d", "e"])
  })

  it("clears redo on a new change and caps the history", () => {
    let h = emptyHistory<number>()
    h = record(h, 1, 0)
    const u = undo(h, 2)!
    expect(record(u.history, u.state, 5000).future).toEqual([])
    for (let i = 0; i < HISTORY_LIMIT + 20; i++) h = record(h, i, i * 1000)
    expect(h.past).toHaveLength(HISTORY_LIMIT)
  })
})
