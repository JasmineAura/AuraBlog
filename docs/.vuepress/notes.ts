import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const SecNote = defineNoteConfig({
  dir: 'cybersecurity',
  link: '/cybersecurity/',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [SecNote],
})
