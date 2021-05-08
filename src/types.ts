import { Note } from "./note-app";

export type RequestType = {
  type?: 'add' | 'list' | 'read' | 'remove' | 'modify';
  user?: string;
  title?: string;
  body?: string;
  color?: string;
}

export type ResponseType = {
  type?: 'add' | 'list' | 'read' | 'remove' | 'modify' ;
  error?: boolean;
  notes?: Note[];
}
