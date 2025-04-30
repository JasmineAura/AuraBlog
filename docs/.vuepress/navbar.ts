import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  {
    text: '笔记',
    items: [{ text: '网络安全', link: '/notes/cybersecurity/', activeMatch: '^/notes/cybersecurity/',}]
  },
])
