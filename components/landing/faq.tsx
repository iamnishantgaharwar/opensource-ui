import { QuestionArt } from "@/components/landing/illustrations"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ISSUES_URL, LANDING_BRAND } from "@/lib/site"

const FAQS = [
  {
    q: "Is csskit free?",
    a: "Yes. It's free and open source, and you can use the themes you export in any project, commercial or not.",
  },
  {
    q: "Does it work with Tailwind CSS v3?",
    a: "Yes. Export a tailwind.config.js block for v3, or a globals.css with an @theme inline block for v4.",
  },
  {
    q: "How does it handle dark mode?",
    a: "Every role gets a dark value from the same palettes, and every contrast check runs on both themes.",
  },
  {
    q: "Which color formats can I copy?",
    a: "HEX, OKLCH, RGB and HSL, for a single swatch or a whole palette.",
  },
  {
    q: "Can I bring my existing theme?",
    a: "Yes. Paste your shadcn globals.css and adjust it from there instead of starting over.",
  },
  {
    q: "Does my data leave the browser?",
    a: "No. There's no account and no server: settings stay in your browser, and a share link carries them in the URL.",
  },
] as const

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-4 border-t"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 sm:px-8 lg:flex-row lg:gap-16">
        <div className="flex flex-col items-start gap-4 lg:w-80 lg:shrink-0">
          <h2
            id="faq-title"
            className="font-display text-[2rem] leading-10 font-bold tracking-normal sm:text-[2.5rem] sm:leading-12"
          >
            Questions, answered
          </h2>
          <p className="text-muted-foreground">
            Can&apos;t find what you need? Open an issue on GitHub.
          </p>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={ISSUES_URL} target="_blank" rel="noreferrer" />}
          >
            Ask a question
          </Button>
          <div className="pt-6">
            <QuestionArt spot={LANDING_BRAND} />
          </div>
        </div>
        <Accordion defaultValue={[FAQS[0].q]} className="min-w-0 flex-1">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-b">
              <AccordionTrigger className="py-4 text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pr-8 pb-5 text-base text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
