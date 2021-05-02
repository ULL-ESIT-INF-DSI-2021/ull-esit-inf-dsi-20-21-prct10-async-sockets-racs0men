"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yargs = require("yargs");
const chalk = require("chalk");
const chokidar = require("chokidar");
const fs_1 = require("fs");
/**
 * @description Comando de Yargs para la opción watcher, el
 * cual controla los cambios realizados sobre el directorio
 * especificado. Este comando espera dos parámetros: usuario y ruta.
 */
yargs.command({
    command: 'watcher',
    describe: 'Recibe el nombre de usuario y la ruta donde se almacenan las notas de dicho usuario.',
    builder: {
        usuario: {
            describe: 'Nombre dek usuario.',
            demandOption: true,
            type: 'string',
        },
        ruta: {
            describe: 'Ruta del directorio donde se almacenan las notas del usuario.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.usuario === 'string') && (typeof argv.ruta === 'string')) {
            fs.access(`./${argv.ruta}/${argv.usuario}`, fs_1.constants.F_OK, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El directorio del usuario ${argv.usuario} no existe.`));
                else {
                    const look = chokidar.watch(`./${argv.ruta}/${argv.usuario}`);
                    console.log(chalk.blue.inverse(`Iniciando la observación del directorio: ${argv.ruta}/${argv.usuario}`));
                    look.on('add', (file, _) => {
                        if (fs.existsSync(file))
                            console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la creación de la nota ${file}.`));
                    });
                    look.on('remove', (file) => {
                        console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la eliminación de la nota ${file}.`));
                    });
                    look.on('modify', (file, _) => {
                        if (fs.existsSync(file))
                            console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la modificación de la nota ${file}.`));
                    });
                }
            });
        }
    },
}).parse();
