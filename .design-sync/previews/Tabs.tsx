import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "opensource-ui"

export function Default() {
  return (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardContent className="text-sm text-muted-foreground">
            Revenue is up 12% this month across all workspaces.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="activity">Recent activity.</TabsContent>
      <TabsContent value="settings">Settings.</TabsContent>
    </Tabs>
  )
}

export function Line() {
  return (
    <Tabs defaultValue="code" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="docs">Docs</TabsTrigger>
      </TabsList>
      <TabsContent
        value="code"
        className="pt-2 font-mono text-xs text-muted-foreground"
      >
        --primary: oklch(0.205 0 0);
      </TabsContent>
    </Tabs>
  )
}
