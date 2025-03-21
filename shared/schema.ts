import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Photos schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
});

export const insertPhotoSchema = createInsertSchema(photos).pick({
  url: true,
  alt: true,
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

// Timeline schema
export const timeline = pgTable("timeline", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const insertTimelineSchema = createInsertSchema(timeline).pick({
  date: true,
  title: true,
  description: true,
});

export type InsertTimeline = z.infer<typeof insertTimelineSchema>;
export type Timeline = typeof timeline.$inferSelect;

// Messages schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  text: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Movies schema
export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("imageUrl").notNull(),
  watched: boolean("watched").notNull().default(false),
});

export const insertMovieSchema = createInsertSchema(movies).pick({
  title: true,
  imageUrl: true,
});

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof movies.$inferSelect;

// Songs schema
export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const insertSongSchema = createInsertSchema(songs).pick({
  title: true,
});

export type InsertSong = z.infer<typeof insertSongSchema>;
export type Song = typeof songs.$inferSelect;

// Dreams schema
export const dreams = pgTable("dreams", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertDreamSchema = createInsertSchema(dreams).pick({
  text: true,
});

export type InsertDream = z.infer<typeof insertDreamSchema>;
export type Dream = typeof dreams.$inferSelect;

// Keep the users schema (required by the original app)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
