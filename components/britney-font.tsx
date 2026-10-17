// Loads Britney (the logo's typeface) from the Fontshare API for the
// `font-display` utility. Its license forbids committing the font files to a
// public repo, so it isn't bundled. React hoists these links into <head>.
const BRITNEY_CSS =
  "https://api.fontshare.com/v2/css?f[]=britney@700&display=swap"

export function BritneyFont() {
  return (
    <>
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      <link rel="stylesheet" href={BRITNEY_CSS} precedence="default" />
    </>
  )
}
