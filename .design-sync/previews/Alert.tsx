import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  HugeiconsIcon,
  Icons,
} from "opensource-ui"

export function Default() {
  return (
    <Alert className="w-96">
      <HugeiconsIcon icon={Icons.InformationCircleIcon} />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Your trial ends in 3 days. Add a payment method to keep your projects.
      </AlertDescription>
    </Alert>
  )
}

export function Destructive() {
  return (
    <Alert variant="destructive" className="w-96">
      <HugeiconsIcon icon={Icons.Alert02Icon} />
      <AlertTitle>Export failed</AlertTitle>
      <AlertDescription>
        The token file couldn&apos;t be written. Check your connection and try
        again.
      </AlertDescription>
    </Alert>
  )
}

export function WithAction() {
  return (
    <Alert className="w-96">
      <HugeiconsIcon icon={Icons.SparklesIcon} />
      <AlertTitle>New: Tailwind v3 export</AlertTitle>
      <AlertDescription>
        HSL channels plus a ready-to-paste config.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Try it
        </Button>
      </AlertAction>
    </Alert>
  )
}
