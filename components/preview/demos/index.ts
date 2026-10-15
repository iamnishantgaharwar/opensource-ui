import type { PreviewSlug } from "@/components/preview/catalog"
import {
  AlertsDemo,
  AvatarsDemo,
  BadgesDemo,
  ButtonsDemo,
  CardsDemo,
  FormsDemo,
  ProgressDemo,
  TablesDemo,
  TabsDemo,
} from "@/components/preview/demos/components"
import {
  ChartsDemo,
  DashboardDemo,
  NavigationDemo,
  SurfacesDemo,
  TypographyDemo,
} from "@/components/preview/demos/patterns"

export const PREVIEW_DEMOS: Record<PreviewSlug, () => React.ReactNode> = {
  buttons: ButtonsDemo,
  badges: BadgesDemo,
  cards: CardsDemo,
  forms: FormsDemo,
  alerts: AlertsDemo,
  tables: TablesDemo,
  tabs: TabsDemo,
  avatars: AvatarsDemo,
  progress: ProgressDemo,
  navigation: NavigationDemo,
  dashboard: DashboardDemo,
  charts: ChartsDemo,
  typography: TypographyDemo,
  surfaces: SurfacesDemo,
}
