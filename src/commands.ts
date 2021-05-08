import * as yargs from 'yargs';
import { client } from './client';
import { RequestType } from "./types";


const cliente = new client(60300);
let req: RequestType = {};

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
      req = {type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
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
      req = {type: 'list', user: argv.user};
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
      req = {type: 'read', user: argv.user, title: argv.title};
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
      req = {type: 'remove', user: argv.user, title: argv.title};
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
      req = {type: 'modify', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
  },
}).parse();

cliente.request(req);