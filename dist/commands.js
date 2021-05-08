"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const client_1 = require("./client");
const cliente = new client_1.client(60300);
let req = {};
//Programa principal
/**
 * @description Comando de Yargs para la opción add,
 * el cual añade una nota nueva a la carpeta del
 * usuario especificado. Este comando espera 4
 * parámetros: user, title, body y color de la nota.
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.user === 'string') && (typeof argv.title === 'string') &&
            (typeof argv.body === 'string') && (typeof argv.color === 'string'))
            req = { type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color };
    },
});
/**
 * @description Comando de Yargs para la opción list, el
 * cual lista todos los títulos de las notas que posee un
 * usuario. Este comando espera un único parámetro: user.
 */
yargs.command({
    command: 'list',
    describe: 'List all the notes',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string')
            req = { type: 'list', user: argv.user };
    },
});
/**
 * @description Comando de Yargs para la opción read, el
 * cual muestra el contenido completo de la nota especificada.
 * Este comando espera 2 parámetros: user y title.
 */
yargs.command({
    command: 'read',
    describe: 'List the content of the note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.user === 'string') && (typeof argv.title === 'string'))
            req = { type: 'read', user: argv.user, title: argv.title };
    },
});
/**
 * @description Comando de Yargs para la opción remove, el cual
 * elimina una nota de la carpeta del usuario especificado.
 * Este comando espera 2 parámetros: user y title.
 */
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.user === 'string') && (typeof argv.title === 'string'))
            req = { type: 'remove', user: argv.user, title: argv.title };
    },
});
/**
 * @description Comando de Yargs para la opción modify, el cual
 * modifica la nota que se le especifique. Este comando espera 4
 * parámetros: user, title, body y color de la nota.
 */
yargs.command({
    command: 'modify',
    describe: 'Modify a note',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.user === 'string') && (typeof argv.title === 'string') &&
            (typeof argv.body === 'string') && (typeof argv.color === 'string'))
            req = { type: 'modify', user: argv.user, title: argv.title, body: argv.body, color: argv.color };
    },
}).parse();
cliente.request(req);
