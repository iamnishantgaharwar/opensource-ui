import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "opensource-ui"

export function Open() {
  return (
    <div className="flex h-72 w-full justify-center pt-4">
      <Popover defaultOpen>
        <PopoverTrigger render={<Button variant="outline" />}>
          Dimensions
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the size of the frame.</PopoverDescription>
          </PopoverHeader>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="w">Width</Label>
              <Input id="w" defaultValue="1280px" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="h">Height</Label>
              <Input id="h" defaultValue="800px" className="col-span-2" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
