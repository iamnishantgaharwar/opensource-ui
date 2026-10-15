import { Progress, ProgressLabel, ProgressValue } from "opensource-ui"

export function WithLabel() {
  return (
    <div className="w-80">
      <Progress value={68}>
        <ProgressLabel>Uploading assets</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}

export function Values() {
  return (
    <div className="flex w-80 flex-col gap-4">
      {[24, 68, 100].map((v) => (
        <Progress key={v} value={v} aria-label={`Upload ${v}%`} />
      ))}
    </div>
  )
}
