import { Icon } from "@/components/icon"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

/**
 * 
  title (string): アイテムのタイトルです。
  disabled (boolean, オプション): アイテムが無効かどうかを示します。
  external (boolean, オプション): アイテムが外部リンクかどうかを示します。
  icon (keyof typeof Icon, オプション): アイテムのアイコンを示します。Icon というオブジェクトのキーのいずれかです。
  
  さらに、SidebarNavItem は以下のいずれかの条件を満たす必要があります：
  href プロパティが存在する場合:
    href (string): リンク先のURLです。
    items プロパティは存在してはいけません (items?: never)。
  items プロパティが存在する場合:
    items (NavItem[]): ナビゲーションアイテムの配列です。
    href プロパティは存在しなくてもよいです (href?: string)。
 */
export type SidebarNavIem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icon
} & (
  | {
      href: string // hrefがある場合はitemsは存在しない
      items?: never
    }
  | {
      href?: string // hrefがない場合はitemsは存在する
      items: NavItem[]
    }
)

export interface MarketingConfig {
  mainNav: NavItem[]
}

export interface DashboardConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavIem[]
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    x: string
    github: string
  }
}
