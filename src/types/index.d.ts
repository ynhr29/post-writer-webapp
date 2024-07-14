export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface MarketingConfig {
  mainNav: NavItem[]
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
