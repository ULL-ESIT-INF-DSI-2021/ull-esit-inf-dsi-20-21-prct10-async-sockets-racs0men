/// <reference types="node" />
import EventEmitter from "events";
import * as net from 'net';
import { ResponseType } from "./types";
export declare class server extends EventEmitter {
    constructor();
    run(connection: net.Socket): void;
    /**
     * @description Método add del servidor, el cual añade
     * una nota nueva a la carpeta del usuario especificado.
     */
    add_method(argv: any): ResponseType;
    /**
     * @description Método list del servidor, el cual lista
     * todos los títulos de las notas que posee un usuario.
     */
    list_method(argv: any): ResponseType;
    /**
     * @description Método read del servidor, el cual muestra
     * el contenido completo de la nota especificada.
     */
    read_method(argv: any): ResponseType;
    /**
     * @description Método remove del servidor, el cual elimina
     * una nota de la carpeta del usuario especificado.
     */
    remove_method(argv: any): ResponseType;
    /**
     * @description Método modify del servidor, el
     * cual modifica la nota que se le especifique.
     */
    modify_method(argv: any): ResponseType;
}
