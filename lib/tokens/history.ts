/**
 * Undo/redo history of settings snapshots. Pure, so the store's behaviour is
 * testable: `record` decides whether a change starts a new undo step.
 */
export interface History<T> {
  past: T[]
  future: T[]
  /** Time of the last recorded change, for grouping a continuous edit. */
  lastChange: number
}

/** Changes closer together than this are one step (a drag, fast typing). */
export const MERGE_MS = 500
export const HISTORY_LIMIT = 100

export const emptyHistory = <T>(): History<T> => ({
  past: [],
  future: [],
  lastChange: Number.NEGATIVE_INFINITY,
})

/**
 * Before applying a change to `current`: keeps `current` as an undo step
 * unless the change continues an edit still in progress. `separate` forces a
 * step (presets, import, reset). Any change clears the redo stack.
 */
export function record<T>(
  h: History<T>,
  current: T,
  now: number,
  separate = false
): History<T> {
  const continuing = !separate && now - h.lastChange < MERGE_MS
  const past = continuing ? h.past : [...h.past, current].slice(-HISTORY_LIMIT)
  // A forced step never merges with what follows it.
  return {
    past,
    future: [],
    lastChange: separate ? Number.NEGATIVE_INFINITY : now,
  }
}

export function undo<T>(h: History<T>, current: T) {
  if (!h.past.length) return null
  return {
    state: h.past[h.past.length - 1],
    history: {
      past: h.past.slice(0, -1),
      future: [current, ...h.future],
      lastChange: Number.NEGATIVE_INFINITY,
    },
  }
}

export function redo<T>(h: History<T>, current: T) {
  if (!h.future.length) return null
  return {
    state: h.future[0],
    history: {
      past: [...h.past, current],
      future: h.future.slice(1),
      lastChange: Number.NEGATIVE_INFINITY,
    },
  }
}
