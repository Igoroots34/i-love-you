import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { jsonStorage as storage } from "./jsonStorage";
import { 
  insertTimelineSchema, 
  insertMovieSchema, 
  insertSongSchema, 
  insertDreamSchema 
} from "@shared/schema";
import { z } from "zod";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the "public" directory
  app.use("/images", express.static("public/images"));

  // prefix all routes with /api
  
  // Photos API
  app.get("/api/photos", async (_req: Request, res: Response) => {
    const photos = await storage.getPhotos();
    res.json(photos);
  });
  
  // Timeline API
  app.get("/api/timeline", async (_req: Request, res: Response) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });
  
  app.post("/api/timeline", async (req: Request, res: Response) => {
    try {
      const parsed = insertTimelineSchema.parse(req.body);
      const newEvent = await storage.createTimelineEvent(parsed);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Messages API
  app.get("/api/messages", async (_req: Request, res: Response) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });
  
  // Movies API
  app.get("/api/movies", async (_req: Request, res: Response) => {
    const movies = await storage.getMovies();
    res.json(movies);
  });
  
  app.post("/api/movies", async (req: Request, res: Response) => {
    try {
      const parsed = insertMovieSchema.parse(req.body);
      const newMovie = await storage.createMovie(parsed);
      res.status(201).json(newMovie);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  app.patch("/api/movies/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { watched } = req.body;
      
      if (typeof watched !== "boolean") {
        return res.status(400).json({ message: "Invalid data: watched must be a boolean" });
      }
      
      const updatedMovie = await storage.updateMovie(id, watched);
      
      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Songs API
  app.get("/api/songs", async (_req: Request, res: Response) => {
    const songs = await storage.getSongs();
    res.json(songs);
  });
  
  app.post("/api/songs", async (req: Request, res: Response) => {
    try {
      const parsed = insertSongSchema.parse(req.body);
      const newSong = await storage.createSong(parsed);
      res.status(201).json(newSong);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Dreams API
  app.get("/api/dreams", async (_req: Request, res: Response) => {
    const dreams = await storage.getDreams();
    res.json(dreams);
  });
  
  app.post("/api/dreams", async (req: Request, res: Response) => {
    try {
      const parsed = insertDreamSchema.parse(req.body);
      const newDream = await storage.createDream(parsed);
      res.status(201).json(newDream);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  app.patch("/api/dreams/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { completed } = req.body;
      
      if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid data: completed must be a boolean" });
      }
      
      const updatedDream = await storage.updateDream(id, completed);
      
      if (!updatedDream) {
        return res.status(404).json({ message: "Dream not found" });
      }
      
      res.json(updatedDream);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
