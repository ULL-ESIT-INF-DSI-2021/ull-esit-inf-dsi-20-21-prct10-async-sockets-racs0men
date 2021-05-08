/**
 * @description Esta es la clase Note, representa una nota.
 */
export declare class Note {
    user: string;
    title: string;
    body: string;
    color: string;
    /**
     * @description Constructor de la clase Note
     * @param user Nombre del usuario que ha creado la nota.
     * @param title Nombre de la nota.
     * @param body Cuerpo de la nota (su contenido).
     * @param color Color de la nota.
     */
    constructor(user: string, title: string, body: string, color: string);
    /**
     * Escribir la nota en formato JSON
     * @returns Nota en formato JSON
     */
    write(): string;
}
