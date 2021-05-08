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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const events_1 = __importDefault(require("events"));
const net = __importStar(require("net"));
const fs = __importStar(require("fs"));
const note_app_1 = require("./note-app");
const chalk = require("chalk");
class server extends events_1.default {
    constructor() {
        super();
        const servidor = net.createServer((connection) => {
            this.run(connection);
        });
        servidor.listen(60300, () => {
            console.log(chalk.blue.inverse('Esperando la conexión de clientes.'));
        });
    }
    run(connection) {
        console.log(chalk.rgb(0, 255, 0).inverse('Se ha conectado un cliente.'));
        connection.on('close', () => {
            console.log(chalk.rgb(255, 0, 0).inverse('Se ha desconectado un cliente.'));
        });
        let allData = '';
        connection.on('data', (chunks) => {
            allData += chunks;
            if (allData.indexOf('\n') !== -1)
                connection.emit('respond', JSON.parse(allData));
        });
        connection.on('respond', (Datos) => {
            let opt = {};
            switch (Datos.type) {
                case 'add':
                    opt = this.add_method(Datos);
                    break;
                case 'list':
                    opt = this.list_method(Datos);
                    break;
                case 'read':
                    opt = this.read_method(Datos);
                    break;
                case 'remove':
                    opt = this.remove_method(Datos);
                    break;
                case 'modify':
                    opt = this.modify_method(Datos);
                    break;
            }
            connection.write(JSON.stringify(opt));
            connection.end();
        });
    }
    /**
     * @description Método add del servidor, el cual añade
     * una nota nueva a la carpeta del usuario especificado.
     */
    add_method(argv) {
        console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} ha usado el método add.`));
        let respuesta;
        if (!fs.existsSync(`./src/users/${argv.user}`)) {
            fs.mkdirSync(`./src/users/${argv.user}`);
            console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} no existía, se ha creado su carpeta.`));
        }
        if (fs.existsSync(`./src/users/${argv.user}/${argv.title}.json`))
            respuesta = { type: 'add', error: false };
        else {
            let nota1 = new note_app_1.Note(argv.user, argv.title, argv.body, argv.color);
            let aux = JSON.stringify(nota1); //aux ahora es nota1.json
            fs.writeFileSync(`./src/users/${argv.user}/${argv.title}.json`, aux);
            respuesta = { type: 'add', error: true };
        }
        return respuesta;
    }
    /**
     * @description Método list del servidor, el cual lista
     * todos los títulos de las notas que posee un usuario.
     */
    list_method(argv) {
        console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} ha usado el método list.`));
        let resultado;
        if (fs.existsSync(`./src/users/${argv.user}`)) {
            let allNotes = [];
            fs.readdirSync(`./src/users/${argv.user}`).forEach((notes) => {
                const contentNote = fs.readFileSync(`./src/users/${argv.user}/${notes}`);
                const JSONote = JSON.parse(contentNote.toString());
                const note = new note_app_1.Note(JSONote.user, JSONote.title, JSONote.body, JSONote.color);
                allNotes.push(note);
            });
            resultado = { type: 'list', error: true, notes: allNotes };
        }
        else
            resultado = { type: 'list', error: false };
        return resultado;
    }
    /**
     * @description Método read del servidor, el cual muestra
     * el contenido completo de la nota especificada.
     */
    read_method(argv) {
        console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} ha usado el método read.`));
        let resultado;
        if (fs.existsSync(`./src/users/${argv.user}/${argv.title}.json`)) {
            const contentNote = fs.readFileSync(`./src/users/${argv.user}/${argv.title}.json`);
            const JSONote = JSON.parse(contentNote.toString());
            const Nota = new note_app_1.Note(JSONote.user, JSONote.title, JSONote.body, JSONote.color);
            resultado = { type: 'read', error: true, notes: [Nota] };
        }
        else
            resultado = { type: 'read', error: false };
        return resultado;
    }
    /**
     * @description Método remove del servidor, el cual elimina
     * una nota de la carpeta del usuario especificado.
     */
    remove_method(argv) {
        console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} ha usado el método remove.`));
        let resultado;
        if (fs.existsSync(`./src/users/${argv.user}/${argv.title}.json`)) {
            fs.rmSync(`./src/users/${argv.user}/${argv.title}.json`);
            resultado = { type: 'remove', error: true };
        }
        else
            resultado = { type: 'remove', error: false };
        return resultado;
    }
    /**
     * @description Método modify del servidor, el
     * cual modifica la nota que se le especifique.
     */
    modify_method(argv) {
        console.log(chalk.rgb(0, 255, 0).inverse(`El usuario ${argv.user} ha usado el método modify.`));
        let resultado;
        if (fs.existsSync(`./src/users/${argv.user}/${argv.title}.json`)) {
            fs.rmSync(`./src/users/${argv.user}/${argv.title}.json`);
            let nota1 = new note_app_1.Note(argv.user, argv.title, argv.body, argv.color);
            let aux = JSON.stringify(nota1); //aux ahora es nota1.json
            fs.writeFileSync(`./src/users/${argv.user}/${argv.title}.json`, aux);
            resultado = { type: 'modify', error: true };
        }
        else
            resultado = { type: 'modify', error: false };
        return resultado;
    }
}
exports.server = server;
const servidor = new server();
