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
exports.client = void 0;
const events_1 = __importDefault(require("events"));
const net = __importStar(require("net"));
const chalk = require("chalk");
class client extends events_1.default {
    constructor(puerto) {
        super();
        this.puerto = puerto;
    }
    run(client) {
        let wholeData = '';
        client.on('data', (dataChunk) => {
            wholeData += dataChunk;
        });
        client.on('end', () => {
            const info = JSON.parse(wholeData);
            switch (info.type) {
                case 'add':
                    if (info.error)
                        console.log(chalk.rgb(0, 255, 0).inverse("La nota ha sido añadida con éxito."));
                    else
                        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: La nota ya existe."));
                    break;
                case 'list':
                    if (info.error) {
                        info.notes.forEach((element) => {
                            console.log(chalk.inverse.keyword(element.color)(element.title));
                            console.log(chalk.inverse.keyword(element.color)(element.body));
                        });
                    }
                    else
                        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: El usuario que ha introducido no existe."));
                    break;
                case 'read':
                    if (info.error) {
                        console.log(chalk.inverse.keyword(info.notes[0].color)(info.notes[0].title));
                        console.log(chalk.inverse.keyword(info.notes[0].color)(info.notes[0].body));
                    }
                    else
                        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: El usuario o la nota que ha introducido no existe."));
                    break;
                case 'remove':
                    if (info.error)
                        console.log(chalk.rgb(0, 255, 0).inverse("La nota ha sido eliminata con correctamente."));
                    else
                        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: La nota que quería eliminar no existe."));
                    break;
                case 'modify':
                    if (info.error)
                        console.log(chalk.rgb(0, 255, 0).inverse("La nota ha sido modificada correctamente."));
                    else
                        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: La nota que quería modificar no existe."));
                    break;
                default:
                    console.log(chalk.rgb(255, 0, 0).inverse("ERROR: El comando que ha introducido no existe."));
                    break;
            }
        });
    }
    request(req) {
        const client = net.connect({ port: this.puerto });
        client.write(JSON.stringify(req) + '\n');
        this.run(client);
    }
}
exports.client = client;
