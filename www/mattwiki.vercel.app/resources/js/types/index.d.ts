export interface AuthUser {
  id: number
  username: string
  is_admin: boolean
}

export interface SiteSettings {
  site_name: string
  site_description: string
  primary_hue: string
  primary_chroma: string
  primary_l: string
}

export interface SharedProps {
  auth: { user: AuthUser | null }
  settings: SiteSettings
  flash?: { success?: string; error?: string }
}

export interface FeaturedArticle {
  title: string
  slug: string
  category: string
  description: string
  readTime: string
  updated: string
}

export interface RecentChange {
  title: string
  slug: string
  category: string
  editor: string
  initials: string
  summary: string
  time: string
}

export interface Category {
  name: string
  count: number
  articles: { title: string; slug: string }[]
}

export interface WikiArticle {
  title: string
  slug: string
  content: string
  category: string
  tags: string[]
  author: string
  authorInitials: string
  updatedAt: string
  readTime: string
}

export interface AdminStats {
  totalArticles: string
  totalArticlesDelta: string
  registeredUsers: string
  registeredUsersDelta: string
  editsToday: string
  editsTodayDelta: string
  pendingReview: string
  pendingReviewDelta: string
}

export interface AdminArticle {
  title: string
  slug: string
  category: string
  status: 'published' | 'draft' | 'review'
  editor: string
  editorName: string
  lastEdit: string
  views: string
}

export interface PublishedArticleForFeature {
  slug: string
  title: string
  category: string
  featured: boolean
}
