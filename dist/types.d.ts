import { Note } from "./note-app";
export declare type RequestType = {
    type?: 'add' | 'list' | 'read' | 'remove' | 'modify';
    user?: string;
    title?: string;
    body?: string;
    color?: string;
};
export declare type ResponseType = {
    type?: 'add' | 'list' | 'read' | 'remove' | 'modify';
    error?: boolean;
    notes?: Note[];
};
