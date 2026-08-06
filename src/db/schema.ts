import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  jsonb,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const drafts = pgTable("drafts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  content: text("content").notNull(),
  inputs: jsonb("inputs").$type<Record<string, string>>().default({}),
  tone: varchar("tone", { length: 50 }).default("formal"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const caseAnalyses = pgTable("case_analyses", {
  id: serial("id").primaryKey(),
  caseName: varchar("case_name", { length: 255 }).notNull(),
  citation: varchar("citation", { length: 255 }),
  year: integer("year"),
  bench: varchar("bench", { length: 255 }),
  ratio: text("ratio").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  known: boolean("known").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const citations = pgTable("citations", {
  id: serial("id").primaryKey(),
  format: varchar("format", { length: 50 }).notNull(),
  inputType: varchar("input_type", { length: 50 }).notNull(),
  raw: text("raw").notNull(),
  formatted: text("formatted").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
