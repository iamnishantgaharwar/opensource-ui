import {
  Avatar,
  AvatarFallback,
  HugeiconsIcon,
  Icons,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "opensource-ui"

const nav = [
  { label: "Dashboard", icon: Icons.DashboardSquare01Icon, active: true },
  { label: "Projects", icon: Icons.Folder01Icon, badge: "12" },
  { label: "Analytics", icon: Icons.Analytics01Icon },
  { label: "Team", icon: Icons.UserGroupIcon },
]

export function AppShell() {
  return (
    <SidebarProvider className="h-[420px] min-h-0 w-full overflow-hidden rounded-xl border">
      <Sidebar collapsible="none">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <HugeiconsIcon
                    icon={Icons.PaintBoardIcon}
                    className="size-4"
                  />
                </span>
                <span className="font-medium">Acme Design</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active}>
                      <HugeiconsIcon icon={item.icon} />
                      {item.label}
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <HugeiconsIcon icon={Icons.Settings02Icon} />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar size="sm">
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-medium">Ada Lovelace</span>
                  <span className="text-xs text-muted-foreground">
                    ada@acme.com
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Ada.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
