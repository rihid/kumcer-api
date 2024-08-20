import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const authors = pgTable('authors', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})
export const publishers = pgTable('publishers', {
  id: serial('id').primaryKey(),
  publisher_name: text('publisher_name').notNull()
})
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  author_id: integer('author_id').references(() => authors.id),
  publisher_id: integer('publisher_id').references(() => publishers.id),
  tags: text('tags').array(),
})