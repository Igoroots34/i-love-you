import { 
  users, type User, type InsertUser,
  photos, type Photo, type InsertPhoto,
  timeline, type Timeline, type InsertTimeline,
  messages, type Message, type InsertMessage,
  movies, type Movie, type InsertMovie,
  songs, type Song, type InsertSong,
  dreams, type Dream, type InsertDream
} from "@shared/schema";
import { stockImages, timelineEvents, messages as messagesList, movieList, songList, dreamsList } from "@/lib/data";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Photos
  getPhotos(): Promise<Photo[]>;
  
  // Timeline
  getTimelineEvents(): Promise<Timeline[]>;
  createTimelineEvent(event: InsertTimeline): Promise<Timeline>;
  
  // Messages
  getMessages(): Promise<Message[]>;
  
  // Movies
  getMovies(): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: number, watched: boolean): Promise<Movie | undefined>;
  
  // Songs
  getSongs(): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
  
  // Dreams
  getDreams(): Promise<Dream[]>;
  createDream(dream: InsertDream): Promise<Dream>;
  updateDream(id: number, completed: boolean): Promise<Dream | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private photos: Map<number, Photo>;
  private timelineEvents: Map<number, Timeline>;
  private messages: Map<number, Message>;
  private movies: Map<number, Movie>;
  private songs: Map<number, Song>;
  private dreams: Map<number, Dream>;
  
  private userCurrentId: number;
  private photoCurrentId: number;
  private timelineCurrentId: number;
  private messageCurrentId: number;
  private movieCurrentId: number;
  private songCurrentId: number;
  private dreamCurrentId: number;

  constructor() {
    this.users = new Map();
    this.photos = new Map();
    this.timelineEvents = new Map();
    this.messages = new Map();
    this.movies = new Map();
    this.songs = new Map();
    this.dreams = new Map();
    
    this.userCurrentId = 1;
    this.photoCurrentId = 1;
    this.timelineCurrentId = 1;
    this.messageCurrentId = 1;
    this.movieCurrentId = 1;
    this.songCurrentId = 1;
    this.dreamCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData(): void {
    // Initialize photos
    stockImages.forEach(photo => {
      this.photos.set(photo.id, { ...photo });
      this.photoCurrentId = Math.max(this.photoCurrentId, photo.id + 1);
    });
    
    // Initialize timeline events
    timelineEvents.forEach(event => {
      this.timelineEvents.set(event.id, { ...event });
      this.timelineCurrentId = Math.max(this.timelineCurrentId, event.id + 1);
    });
    
    // Initialize messages
    messagesList.forEach(message => {
      this.messages.set(message.id, { ...message });
      this.messageCurrentId = Math.max(this.messageCurrentId, message.id + 1);
    });
    
    // Initialize movies
    movieList.forEach(movie => {
      this.movies.set(movie.id, { ...movie });
      this.movieCurrentId = Math.max(this.movieCurrentId, movie.id + 1);
    });
    
    // Initialize songs
    songList.forEach(song => {
      this.songs.set(song.id, { ...song });
      this.songCurrentId = Math.max(this.songCurrentId, song.id + 1);
    });
    
    // Initialize dreams
    dreamsList.forEach(dream => {
      this.dreams.set(dream.id, { ...dream });
      this.dreamCurrentId = Math.max(this.dreamCurrentId, dream.id + 1);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Photo methods
  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }

  // Timeline methods
  async getTimelineEvents(): Promise<Timeline[]> {
    return Array.from(this.timelineEvents.values());
  }

  async createTimelineEvent(event: InsertTimeline): Promise<Timeline> {
    const id = this.timelineCurrentId++;
    const newEvent: Timeline = { ...event, id };
    this.timelineEvents.set(id, newEvent);
    return newEvent;
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  // Movie methods
  async getMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values());
  }

  async createMovie(movie: InsertMovie): Promise<Movie> {
    const id = this.movieCurrentId++;
    const newMovie: Movie = { ...movie, id, watched: false };
    this.movies.set(id, newMovie);
    return newMovie;
  }

  async updateMovie(id: number, watched: boolean): Promise<Movie | undefined> {
    const movie = this.movies.get(id);
    if (!movie) return undefined;
    
    const updatedMovie = { ...movie, watched };
    this.movies.set(id, updatedMovie);
    return updatedMovie;
  }

  // Song methods
  async getSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }

  async createSong(song: InsertSong): Promise<Song> {
    const id = this.songCurrentId++;
    const newSong: Song = { ...song, id };
    this.songs.set(id, newSong);
    return newSong;
  }

  // Dream methods
  async getDreams(): Promise<Dream[]> {
    return Array.from(this.dreams.values());
  }

  async createDream(dream: InsertDream): Promise<Dream> {
    const id = this.dreamCurrentId++;
    const newDream: Dream = { ...dream, id, completed: false };
    this.dreams.set(id, newDream);
    return newDream;
  }

  async updateDream(id: number, completed: boolean): Promise<Dream | undefined> {
    const dream = this.dreams.get(id);
    if (!dream) return undefined;
    
    const updatedDream = { ...dream, completed };
    this.dreams.set(id, updatedDream);
    return updatedDream;
  }
}

export const storage = new MemStorage();
