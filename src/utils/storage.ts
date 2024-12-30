const PREFIX = 'finmate_';

export const storage = {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : null;
  },

  set(key: string, value: any): void {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}; 