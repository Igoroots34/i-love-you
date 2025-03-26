// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/jsonStorage.ts
import fs from "fs";
import path from "path";

// client/src/lib/data.ts
var stockImages = [
  { id: 1, url: "/images/foto6.jpg", alt: "Voc\xEA \xE9 a luz que ilumina minha vida." },
  { id: 2, url: "/images/foto22.jpg", alt: "Cada momento com voc\xEA \xE9 inesquec\xEDvel." },
  { id: 3, url: "/images/foto3.jpg", alt: "Seu amor \xE9 como um p\xF4r do sol, lindo e eterno." },
  { id: 4, url: "/images/foto20.jpg", alt: "Voc\xEA \xE9 meu sonho realizado." },
  { id: 5, url: "/images/foto5.jpg", alt: "Com voc\xEA, tudo \xE9 mais bonito." },
  { id: 6, url: "/images/foto16.jpg", alt: "Meu cora\xE7\xE3o pertence a voc\xEA." },
  { id: 7, url: "/images/foto17.jpg", alt: "Voc\xEA \xE9 meu porto seguro." },
  { id: 8, url: "/images/foto18.jpg", alt: "Nosso amor \xE9 como as estrelas, eterno." }
];
var timelineEvents = [
  {
    id: 1,
    date: "2023-10-06",
    title: "Nosso Primeiro Encontro",
    description: "O dia em que tudo come\xE7ou, quando nos conhecemos e soubemos que algo especial estava surgindo."
  },
  {
    id: 2,
    date: "2023-10-24",
    title: "Primeiro Beijo",
    description: "Um momento m\xE1gico que selou o come\xE7o da nossa hist\xF3ria."
  },
  {
    id: 3,
    date: "2023-11-15",
    title: "Pedido de Namoro",
    description: "Quando oficializamos nosso amor e decidimos construir algo juntos."
  },
  {
    id: 4,
    date: "2023-12-24",
    title: "Primeiro Natal Juntos",
    description: "Celebramos o amor e a uni\xE3o ao lado de nossas fam\xEDlias."
  },
  {
    id: 5,
    date: "2023-12-31",
    title: "Virada de Ano",
    description: "Juntos vimos o in\xEDcio de um novo ano, com promessas e sonhos compartilhados."
  }
];
var messages = [
  { id: 1, text: "Voc\xEA \xE9 o amor da minha vida!" },
  { id: 2, text: "Cada dia ao seu lado \xE9 uma b\xEAn\xE7\xE3o." },
  { id: 3, text: "Seu sorriso ilumina meu mundo." },
  { id: 4, text: "Te amo mais a cada dia que passa." },
  { id: 5, text: "Voc\xEA \xE9 meu sonho realizado." },
  { id: 6, text: "Meu cora\xE7\xE3o bate mais forte por voc\xEA." },
  { id: 7, text: "Voc\xEA \xE9 a pessoa mais especial do mundo." },
  { id: 8, text: "N\xE3o vejo a hora de construir nossa vida juntos." },
  { id: 9, text: "Com voc\xEA, aprendi o verdadeiro significado do amor." },
  { id: 10, text: "Voc\xEA me faz querer ser uma pessoa melhor todos os dias." }
];
var movieList = [
  {
    id: 1,
    title: "O Poderoso Chef\xE3o",
    imageUrl: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg",
    watched: true
  },
  {
    id: 2,
    title: "Me Before You",
    imageUrl: "https://images.unsplash.com/foto-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    watched: false
  },
  {
    id: 3,
    title: "La La Land",
    imageUrl: "https://images.unsplash.com/foto-1516514522897-737d9fb4589d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    watched: true
  },
  {
    id: 4,
    title: "Titanic",
    imageUrl: "https://images.unsplash.com/foto-1546704864-07229da8c8d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    watched: true
  },
  {
    id: 5,
    title: "Orgulho e Preconceito",
    imageUrl: "https://images.unsplash.com/foto-1510025369388-f613ec4bc10b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    watched: false
  },
  {
    id: 6,
    title: "Amor Para Recordar",
    imageUrl: "https://images.unsplash.com/foto-1490131784822-b4626a8ec96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    watched: false
  }
];
var songList = [
  { id: 1, title: "Perfect - Ed Sheeran" },
  { id: 2, title: "At Last - Etta James" },
  { id: 3, title: "Can't Help Falling in Love - Elvis Presley" },
  { id: 4, title: "All of Me - John Legend" },
  { id: 5, title: "Just the Way You Are - Bruno Mars" }
];
var dreamsList = [
  { id: 1, text: "Viajar para Paris", completed: false },
  { id: 2, text: "Ter uma casa pr\xF3pria", completed: false },
  { id: 3, text: "Adotar um cachorro", completed: false },
  { id: 4, text: "Fazer uma viagem de carro pelo pa\xEDs", completed: false },
  { id: 5, text: "Visitar uma praia paradis\xEDaca", completed: true },
  { id: 6, text: "Assistir ao p\xF4r do sol em um lugar especial", completed: true }
];

// server/jsonStorage.ts
var DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
var JsonStorage = class {
  userFilePath = path.join(DATA_DIR, "users.json");
  photoFilePath = path.join(DATA_DIR, "photos.json");
  timelineFilePath = path.join(DATA_DIR, "timeline.json");
  messageFilePath = path.join(DATA_DIR, "messages.json");
  movieFilePath = path.join(DATA_DIR, "movies.json");
  songFilePath = path.join(DATA_DIR, "songs.json");
  dreamFilePath = path.join(DATA_DIR, "dreams.json");
  userCurrentId = 1;
  photoCurrentId = 1;
  timelineCurrentId = 1;
  messageCurrentId = 1;
  movieCurrentId = 1;
  songCurrentId = 1;
  dreamCurrentId = 1;
  constructor() {
    this.initializeDataFiles();
  }
  initializeDataFiles() {
    if (!fs.existsSync(this.userFilePath)) {
      fs.writeFileSync(this.userFilePath, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(this.photoFilePath)) {
      fs.writeFileSync(this.photoFilePath, JSON.stringify(stockImages, null, 2));
      this.photoCurrentId = Math.max(...stockImages.map((photo) => photo.id)) + 1;
    } else {
      const photos2 = this.readJsonFile(this.photoFilePath);
      this.photoCurrentId = photos2.length > 0 ? Math.max(...photos2.map((photo) => photo.id)) + 1 : 1;
    }
    if (!fs.existsSync(this.timelineFilePath)) {
      fs.writeFileSync(this.timelineFilePath, JSON.stringify(timelineEvents, null, 2));
      this.timelineCurrentId = Math.max(...timelineEvents.map((event) => event.id)) + 1;
    } else {
      const events = this.readJsonFile(this.timelineFilePath);
      this.timelineCurrentId = events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;
    }
    if (!fs.existsSync(this.messageFilePath)) {
      fs.writeFileSync(this.messageFilePath, JSON.stringify(messages, null, 2));
      this.messageCurrentId = Math.max(...messages.map((message) => message.id)) + 1;
    } else {
      const messages3 = this.readJsonFile(this.messageFilePath);
      this.messageCurrentId = messages3.length > 0 ? Math.max(...messages3.map((message) => message.id)) + 1 : 1;
    }
    if (!fs.existsSync(this.movieFilePath)) {
      fs.writeFileSync(this.movieFilePath, JSON.stringify(movieList, null, 2));
      this.movieCurrentId = Math.max(...movieList.map((movie) => movie.id)) + 1;
    } else {
      const movies2 = this.readJsonFile(this.movieFilePath);
      this.movieCurrentId = movies2.length > 0 ? Math.max(...movies2.map((movie) => movie.id)) + 1 : 1;
    }
    if (!fs.existsSync(this.songFilePath)) {
      fs.writeFileSync(this.songFilePath, JSON.stringify(songList, null, 2));
      this.songCurrentId = Math.max(...songList.map((song) => song.id)) + 1;
    } else {
      const songs2 = this.readJsonFile(this.songFilePath);
      this.songCurrentId = songs2.length > 0 ? Math.max(...songs2.map((song) => song.id)) + 1 : 1;
    }
    if (!fs.existsSync(this.dreamFilePath)) {
      fs.writeFileSync(this.dreamFilePath, JSON.stringify(dreamsList, null, 2));
      this.dreamCurrentId = Math.max(...dreamsList.map((dream) => dream.id)) + 1;
    } else {
      const dreams2 = this.readJsonFile(this.dreamFilePath);
      this.dreamCurrentId = dreams2.length > 0 ? Math.max(...dreams2.map((dream) => dream.id)) + 1 : 1;
    }
  }
  readJsonFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return [];
    }
  }
  writeJsonFile(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing to file ${filePath}:`, error);
    }
  }
  // User methods
  async getUser(id) {
    const users2 = this.readJsonFile(this.userFilePath);
    return users2.find((user) => user.id === id);
  }
  async getUserByUsername(username) {
    const users2 = this.readJsonFile(this.userFilePath);
    return users2.find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const users2 = this.readJsonFile(this.userFilePath);
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    users2.push(user);
    this.writeJsonFile(this.userFilePath, users2);
    return user;
  }
  // Photo methods
  async getPhotos() {
    return this.readJsonFile(this.photoFilePath);
  }
  // Timeline methods
  async getTimelineEvents() {
    return this.readJsonFile(this.timelineFilePath);
  }
  async createTimelineEvent(event) {
    const events = this.readJsonFile(this.timelineFilePath);
    const id = this.timelineCurrentId++;
    const newEvent = { ...event, id };
    events.push(newEvent);
    this.writeJsonFile(this.timelineFilePath, events);
    return newEvent;
  }
  // Message methods
  async getMessages() {
    return this.readJsonFile(this.messageFilePath);
  }
  // Movie methods
  async getMovies() {
    return this.readJsonFile(this.movieFilePath);
  }
  async createMovie(movie) {
    const movies2 = this.readJsonFile(this.movieFilePath);
    const id = this.movieCurrentId++;
    const newMovie = { ...movie, id, watched: false };
    movies2.push(newMovie);
    this.writeJsonFile(this.movieFilePath, movies2);
    return newMovie;
  }
  async updateMovie(id, watched) {
    const movies2 = this.readJsonFile(this.movieFilePath);
    const movieIndex = movies2.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return void 0;
    movies2[movieIndex].watched = watched;
    this.writeJsonFile(this.movieFilePath, movies2);
    return movies2[movieIndex];
  }
  // Song methods
  async getSongs() {
    return this.readJsonFile(this.songFilePath);
  }
  async createSong(song) {
    const songs2 = this.readJsonFile(this.songFilePath);
    const id = this.songCurrentId++;
    const newSong = { ...song, id };
    songs2.push(newSong);
    this.writeJsonFile(this.songFilePath, songs2);
    return newSong;
  }
  // Dream methods
  async getDreams() {
    return this.readJsonFile(this.dreamFilePath);
  }
  async createDream(dream) {
    const dreams2 = this.readJsonFile(this.dreamFilePath);
    const id = this.dreamCurrentId++;
    const newDream = { ...dream, id, completed: false };
    dreams2.push(newDream);
    this.writeJsonFile(this.dreamFilePath, dreams2);
    return newDream;
  }
  async updateDream(id, completed) {
    const dreams2 = this.readJsonFile(this.dreamFilePath);
    const dreamIndex = dreams2.findIndex((dream) => dream.id === id);
    if (dreamIndex === -1) return void 0;
    dreams2[dreamIndex].completed = completed;
    this.writeJsonFile(this.dreamFilePath, dreams2);
    return dreams2[dreamIndex];
  }
};
var jsonStorage = new JsonStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull()
});
var insertPhotoSchema = createInsertSchema(photos).pick({
  url: true,
  alt: true
});
var timeline = pgTable("timeline", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull()
});
var insertTimelineSchema = createInsertSchema(timeline).pick({
  date: true,
  title: true,
  description: true
});
var messages2 = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull()
});
var insertMessageSchema = createInsertSchema(messages2).pick({
  text: true
});
var movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("imageUrl").notNull(),
  genre: text("genre").notNull(),
  watched: boolean("watched").notNull().default(false)
});
var insertMovieSchema = createInsertSchema(movies).pick({
  title: true,
  imageUrl: true,
  genre: true
});
var songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull()
});
var insertSongSchema = createInsertSchema(songs).pick({
  title: true
});
var dreams = pgTable("dreams", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").notNull().default(false)
});
var insertDreamSchema = createInsertSchema(dreams).pick({
  text: true
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/routes.ts
import { z } from "zod";
import express from "express";
async function registerRoutes(app2) {
  app2.use("/images", express.static("public/images"));
  app2.get("/api/photos", async (_req, res) => {
    const photos2 = await jsonStorage.getPhotos();
    res.json(photos2);
  });
  app2.get("/api/timeline", async (_req, res) => {
    const events = await jsonStorage.getTimelineEvents();
    res.json(events);
  });
  app2.post("/api/timeline", async (req, res) => {
    try {
      const parsed = insertTimelineSchema.parse(req.body);
      const newEvent = await jsonStorage.createTimelineEvent(parsed);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  app2.get("/api/messages", async (_req, res) => {
    const messages3 = await jsonStorage.getMessages();
    res.json(messages3);
  });
  app2.get("/api/movies", async (_req, res) => {
    const movies2 = await jsonStorage.getMovies();
    res.json(movies2);
  });
  app2.post("/api/movies", async (req, res) => {
    try {
      const parsed = insertMovieSchema.parse(req.body);
      const newMovie = await jsonStorage.createMovie(parsed);
      res.status(201).json(newMovie);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  app2.patch("/api/movies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { watched } = req.body;
      if (typeof watched !== "boolean") {
        return res.status(400).json({ message: "Invalid data: watched must be a boolean" });
      }
      const updatedMovie = await jsonStorage.updateMovie(id, watched);
      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/songs", async (_req, res) => {
    const songs2 = await jsonStorage.getSongs();
    res.json(songs2);
  });
  app2.post("/api/songs", async (req, res) => {
    try {
      const parsed = insertSongSchema.parse(req.body);
      const newSong = await jsonStorage.createSong(parsed);
      res.status(201).json(newSong);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  app2.get("/api/dreams", async (_req, res) => {
    const dreams2 = await jsonStorage.getDreams();
    res.json(dreams2);
  });
  app2.post("/api/dreams", async (req, res) => {
    try {
      const parsed = insertDreamSchema.parse(req.body);
      const newDream = await jsonStorage.createDream(parsed);
      res.status(201).json(newDream);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  app2.patch("/api/dreams/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { completed } = req.body;
      if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid data: completed must be a boolean" });
      }
      const updatedDream = await jsonStorage.updateDream(id, completed);
      if (!updatedDream) {
        return res.status(404).json({ message: "Dream not found" });
      }
      res.json(updatedDream);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path2, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "client", "src"),
      "@shared": path2.resolve(__dirname, "shared")
    }
  },
  root: path2.resolve(__dirname, "client"),
  build: {
    outDir: path2.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: "assets"
    // Certifique-se de que os assets sejam organizados
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(__dirname2, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
