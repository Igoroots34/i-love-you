import fs from 'fs';
import path from 'path';
import { IStorage } from './storage';
import { 
  User, InsertUser,
  Photo, InsertPhoto,
  Timeline, InsertTimeline,
  Message, InsertMessage,
  Movie, InsertMovie, 
  Song, InsertSong,
  Dream, InsertDream
} from "@shared/schema";
import { stockImages, timelineEvents, messages as messagesList, movieList, songList, dreamsList } from "@/lib/data";

// Directory where JSON files will be stored
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class JsonStorage implements IStorage {
  private userFilePath = path.join(DATA_DIR, 'users.json');
  private photoFilePath = path.join(DATA_DIR, 'photos.json');
  private timelineFilePath = path.join(DATA_DIR, 'timeline.json');
  private messageFilePath = path.join(DATA_DIR, 'messages.json');
  private movieFilePath = path.join(DATA_DIR, 'movies.json');
  private songFilePath = path.join(DATA_DIR, 'songs.json');
  private dreamFilePath = path.join(DATA_DIR, 'dreams.json');

  private userCurrentId: number = 1;
  private photoCurrentId: number = 1;
  private timelineCurrentId: number = 1;
  private messageCurrentId: number = 1;
  private movieCurrentId: number = 1;
  private songCurrentId: number = 1;
  private dreamCurrentId: number = 1;

  constructor() {
    // Initialize data files if they don't exist
    this.initializeDataFiles();
  }

  private initializeDataFiles(): void {
    // Initialize users
    if (!fs.existsSync(this.userFilePath)) {
      fs.writeFileSync(this.userFilePath, JSON.stringify([], null, 2));
    }

    // Initialize photos
    if (!fs.existsSync(this.photoFilePath)) {
      fs.writeFileSync(this.photoFilePath, JSON.stringify(stockImages, null, 2));
      this.photoCurrentId = Math.max(...stockImages.map(photo => photo.id)) + 1;
    } else {
      const photos = this.readJsonFile<Photo[]>(this.photoFilePath);
      this.photoCurrentId = photos.length > 0 ? Math.max(...photos.map(photo => photo.id)) + 1 : 1;
    }

    // Initialize timeline
    if (!fs.existsSync(this.timelineFilePath)) {
      fs.writeFileSync(this.timelineFilePath, JSON.stringify(timelineEvents, null, 2));
      this.timelineCurrentId = Math.max(...timelineEvents.map(event => event.id)) + 1;
    } else {
      const events = this.readJsonFile<Timeline[]>(this.timelineFilePath);
      this.timelineCurrentId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    }

    // Initialize messages
    if (!fs.existsSync(this.messageFilePath)) {
      fs.writeFileSync(this.messageFilePath, JSON.stringify(messagesList, null, 2));
      this.messageCurrentId = Math.max(...messagesList.map(message => message.id)) + 1;
    } else {
      const messages = this.readJsonFile<Message[]>(this.messageFilePath);
      this.messageCurrentId = messages.length > 0 ? Math.max(...messages.map(message => message.id)) + 1 : 1;
    }

    // Initialize movies
    if (!fs.existsSync(this.movieFilePath)) {
      fs.writeFileSync(this.movieFilePath, JSON.stringify(movieList, null, 2));
      this.movieCurrentId = Math.max(...movieList.map(movie => movie.id)) + 1;
    } else {
      const movies = this.readJsonFile<Movie[]>(this.movieFilePath);
      this.movieCurrentId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;
    }

    // Initialize songs
    if (!fs.existsSync(this.songFilePath)) {
      fs.writeFileSync(this.songFilePath, JSON.stringify(songList, null, 2));
      this.songCurrentId = Math.max(...songList.map(song => song.id)) + 1;
    } else {
      const songs = this.readJsonFile<Song[]>(this.songFilePath);
      this.songCurrentId = songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 1;
    }

    // Initialize dreams
    if (!fs.existsSync(this.dreamFilePath)) {
      fs.writeFileSync(this.dreamFilePath, JSON.stringify(dreamsList, null, 2));
      this.dreamCurrentId = Math.max(...dreamsList.map(dream => dream.id)) + 1;
    } else {
      const dreams = this.readJsonFile<Dream[]>(this.dreamFilePath);
      this.dreamCurrentId = dreams.length > 0 ? Math.max(...dreams.map(dream => dream.id)) + 1 : 1;
    }
  }

  private readJsonFile<T>(filePath: string): T {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return [] as unknown as T;
    }
  }

  private writeJsonFile<T>(filePath: string, data: T): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing to file ${filePath}:`, error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const users = this.readJsonFile<User[]>(this.userFilePath);
    return users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = this.readJsonFile<User[]>(this.userFilePath);
    return users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = this.readJsonFile<User[]>(this.userFilePath);
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    users.push(user);
    this.writeJsonFile(this.userFilePath, users);
    return user;
  }

  // Photo methods
  async getPhotos(): Promise<Photo[]> {
    return this.readJsonFile<Photo[]>(this.photoFilePath);
  }

  // Timeline methods
  async getTimelineEvents(): Promise<Timeline[]> {
    return this.readJsonFile<Timeline[]>(this.timelineFilePath);
  }

  async createTimelineEvent(event: InsertTimeline): Promise<Timeline> {
    const events = this.readJsonFile<Timeline[]>(this.timelineFilePath);
    const id = this.timelineCurrentId++;
    const newEvent: Timeline = { ...event, id };
    events.push(newEvent);
    this.writeJsonFile(this.timelineFilePath, events);
    return newEvent;
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return this.readJsonFile<Message[]>(this.messageFilePath);
  }

  // Movie methods
  async getMovies(): Promise<Movie[]> {
    return this.readJsonFile<Movie[]>(this.movieFilePath);
  }

  async createMovie(movie: InsertMovie): Promise<Movie> {
    const movies = this.readJsonFile<Movie[]>(this.movieFilePath);
    const id = this.movieCurrentId++;
    const newMovie: Movie = { ...movie, id, watched: false };
    movies.push(newMovie);
    this.writeJsonFile(this.movieFilePath, movies);
    return newMovie;
  }

  async updateMovie(id: number, watched: boolean): Promise<Movie | undefined> {
    const movies = this.readJsonFile<Movie[]>(this.movieFilePath);
    const movieIndex = movies.findIndex(movie => movie.id === id);
    
    if (movieIndex === -1) return undefined;
    
    movies[movieIndex].watched = watched;
    this.writeJsonFile(this.movieFilePath, movies);
    return movies[movieIndex];
  }

  // Song methods
  async getSongs(): Promise<Song[]> {
    return this.readJsonFile<Song[]>(this.songFilePath);
  }

  async createSong(song: InsertSong): Promise<Song> {
    const songs = this.readJsonFile<Song[]>(this.songFilePath);
    const id = this.songCurrentId++;
    const newSong: Song = { ...song, id };
    songs.push(newSong);
    this.writeJsonFile(this.songFilePath, songs);
    return newSong;
  }

  // Dream methods
  async getDreams(): Promise<Dream[]> {
    return this.readJsonFile<Dream[]>(this.dreamFilePath);
  }

  async createDream(dream: InsertDream): Promise<Dream> {
    const dreams = this.readJsonFile<Dream[]>(this.dreamFilePath);
    const id = this.dreamCurrentId++;
    const newDream: Dream = { ...dream, id, completed: false };
    dreams.push(newDream);
    this.writeJsonFile(this.dreamFilePath, dreams);
    return newDream;
  }

  async updateDream(id: number, completed: boolean): Promise<Dream | undefined> {
    const dreams = this.readJsonFile<Dream[]>(this.dreamFilePath);
    const dreamIndex = dreams.findIndex(dream => dream.id === id);
    
    if (dreamIndex === -1) return undefined;
    
    dreams[dreamIndex].completed = completed;
    this.writeJsonFile(this.dreamFilePath, dreams);
    return dreams[dreamIndex];
  }
}

export const jsonStorage = new JsonStorage();