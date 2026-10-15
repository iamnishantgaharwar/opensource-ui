import { useEffect } from "react"
import { Button, Toaster, toast } from "opensource-ui"

export function Toasts() {
  useEffect(() => {
    toast("Event created", { description: "Design review, Oct 17 at 10:00" })
    toast.success("Link copied")
    toast.error("Upload failed", {
      action: { label: "Retry", onClick: () => {} },
    })
  }, [])
  return (
    <div className="h-72 w-full">
      <Button variant="outline" onClick={() => toast.success("Saved")}>
        Show toast
      </Button>
      <Toaster position="bottom-center" expand />
    </div>
  )
}
