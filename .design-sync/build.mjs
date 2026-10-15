// Builds the inputs the design-sync converter expects from a published
// package. This app has no dist/, so we produce one under .design-sync/.cache:
//   dist/ds.css     - .design-sync/tailwind.css compiled with the repo's Tailwind
//   dist/types/     - tsc declarations for components/ui (the props contracts)
//   dist/index.js   - entry re-exporting every components/ui module, plus
//                     toast(), HugeiconsIcon and the curated Icons set
import { execFileSync } from "node:child_process"
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import tailwind from "@tailwindcss/postcss"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = join(here, ".cache/dist")
const uiDir = join(root, "components/ui")
const modules = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort()

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

const cssFrom = join(here, "tailwind.css")
const css = await postcss([tailwind({ base: here, optimize: false })]).process(
  readFileSync(cssFrom, "utf8"),
  { from: cssFrom, to: join(dist, "ds.css") }
)
writeFileSync(join(dist, "ds.css"), css.css)

execFileSync(
  join(root, "node_modules/.bin/tsc"),
  ["-p", join(here, "tsconfig.dts.json")],
  {
    stdio: "inherit",
  }
)

// tsc keeps `@/…` specifiers as written; rewrite them to relative paths so the
// declaration tree resolves without the app's tsconfig.
const typesDir = join(dist, "types")
const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]
  )
for (const file of walk(typesDir).filter((f) => f.endsWith(".d.ts"))) {
  const src = readFileSync(file, "utf8")
  const out = src.replace(/(["'])@\/([^"']+)\1/g, (_, q, p) => {
    let rel = relative(dirname(file), join(typesDir, p))
    if (!rel.startsWith(".")) rel = `./${rel}`
    return `${q}${rel}${q}`
  })
  if (out !== src) writeFileSync(file, out)
}

const icons = readFileSync(join(here, "icons.ts"), "utf8")
writeFileSync(join(dist, "icons.js"), icons)
writeFileSync(join(dist, "icons.d.ts"), icons)
const extras = [
  // Toaster renders nothing until something calls toast(), so ship it too.
  `export { toast } from "sonner"`,
  `export { HugeiconsIcon } from "@hugeicons/react"`,
  `export * as Icons from "./icons.js"`,
].join("\n")

const toUi = relative(dist, uiDir)
writeFileSync(
  join(dist, "index.js"),
  modules.map((m) => `export * from "${toUi}/${m}.tsx"`).join("\n") +
    `\n${extras}\n`
)
writeFileSync(
  join(dist, "index.d.ts"),
  modules.map((m) => `export * from "./types/components/ui/${m}"`).join("\n") +
    `\n${extras.replace("./icons.js", "./icons")}\n`
)
writeFileSync(
  join(dist, "package.json"),
  JSON.stringify(
    {
      name: "opensource-ui",
      version: "0.0.1",
      type: "module",
      module: "./index.js",
      types: "./index.d.ts",
    },
    null,
    2
  ) + "\n"
)
console.log(
  `built ${modules.length} modules, ${(css.css.length / 1024).toFixed(0)} KB css → ${dist}`
)
