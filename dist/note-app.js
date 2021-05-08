"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
/**
 * @description Esta es la clase Note, representa una nota.
 */
class Note {
    /**
     * @description Constructor de la clase Note
     * @param user Nombre del usuario que ha creado la nota.
     * @param title Nombre de la nota.
     * @param body Cuerpo de la nota (su contenido).
     * @param color Color de la nota.
     */
    constructor(user, title, body, color) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    /**
     * Escribir la nota en formato JSON
     * @returns Nota en formato JSON
     */
    write() {
        return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"' + this.body +
            '\",\n\"color\": \"' + this.color + '\"\n}';
    }
}
exports.Note = Note;
