import {
  Button,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "opensource-ui"

export function Open() {
  return (
    <Sheet defaultOpen>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit profile
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Changes are saved when you click Save.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Ada Lovelace" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-handle">Username</Label>
            <Input id="sheet-handle" defaultValue="@ada" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
