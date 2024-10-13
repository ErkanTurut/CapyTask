export interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color: "blue" | "pink" | "indigo" | "placeholder";
  isPlaceholder?: boolean;
}

export type ColorClasses = {
  [key in Event["color"]]: string;
};
