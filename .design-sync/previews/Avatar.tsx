import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "opensource-ui"

export function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function Group() {
  return (
    <AvatarGroup>
      {["AL", "AT", "GH", "LT"].map((p) => (
        <Avatar key={p}>
          <AvatarFallback>{p}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  )
}

export function WithStatus() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarFallback>GH</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <div className="flex flex-col text-sm">
        <span className="font-medium">Grace Hopper</span>
        <span className="text-muted-foreground">Online</span>
      </div>
    </div>
  )
}
