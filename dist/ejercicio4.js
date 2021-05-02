"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");
const child_process_1 = require("child_process");
/**
 * @description Comando de Yargs para la opción diorfile, el cual
 * dada una ruta concreta, muestra si es un directorio o un fichero.
 */
yargs.command({
    command: 'dirorfile',
    describe: 'Comprueba si la ruta especificada es un directorio o un fichero.',
    builder: {
        ruta: {
            describe: 'Ruta del directorio o fichero.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.ruta === "string") {
            let entrada = argv.ruta;
            fs.access(entrada, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El directorio o fichero especificado no existe.\n"));
                else {
                    fs.open(entrada, fs.constants.O_DIRECTORY, (err) => {
                        if (err)
                            console.log(chalk.rgb(45, 247, 17).inverse("\nLa ruta introducida es un fichero.\n"));
                        else
                            console.log(chalk.rgb(45, 247, 17).inverse("\nLa ruta introducida es un directorio.\n"));
                    });
                }
            });
        }
    },
});
/**
 * @description Comando de Yargs para la opción mkdir, el cual
 * dada una ruta concreta, crea un nuevo directorio.
 */
yargs.command({
    command: 'mkdir',
    describe: 'Crea un directorio nuevo a partir de la ruta especificada.',
    builder: {
        ruta: {
            describe: 'Ruta del directorio y su nombre.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.ruta === "string") {
            let entrada = argv.ruta;
            fs.access(entrada, (err) => {
                if (!err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\n ERROR: Este directorio ya existe.\n"));
                else {
                    fs.mkdir(entrada, (err) => {
                        if (err)
                            console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: La ruta especificada es incorrecta.\n"));
                        else
                            console.log(chalk.rgb(45, 247, 17).inverse("\nDirectorio creado satisfactoriamente.\n"));
                    });
                }
            });
        }
    },
});
/**
 * @description Comando de Yargs para la opción list, el cual
 * dada una ruta concreta, lista los ficheros que hay en el directorio.
 */
yargs.command({
    command: 'list',
    describe: 'Lista los ficheros que hay en el directorio especidicado.',
    builder: {
        ruta: {
            describe: 'Ruta del directorio.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.ruta === "string") {
            let entrada = argv.ruta;
            fs.access(entrada, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El directorio con la ruta especificada no existe.\n"));
                else {
                    console.log(chalk.rgb(45, 247, 17).inverse("\nListando los ficheros que hay en el directorio:\n"));
                    const ls = child_process_1.spawn('ls', [entrada]);
                    ls.stdout.pipe(process.stdout);
                }
            });
        }
    },
});
/**
 * @description Comando de Yargs para la opción cat, el cual
 * dada una ruta concreta, muestra el contenido de un fichero.
 */
yargs.command({
    command: 'cat',
    describe: 'Muestra el contenido de un fichero',
    builder: {
        ruta: {
            describe: 'Ruta del fichero al qu ese quiere acceder.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.ruta === "string") {
            let entrada = argv.ruta;
            fs.access(entrada, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El fichero de la ruta especificada no existe.\n"));
                else {
                    fs.open(entrada, fs.constants.O_DIRECTORY, (err) => {
                        if (err) {
                            console.log();
                            const cat = child_process_1.spawn('cat', [entrada]);
                            cat.stdout.pipe(process.stdout);
                        }
                        else
                            console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: La ruta especificada no es un fichero.\n"));
                    });
                }
            });
        }
    },
});
/**
 * @description Comando de Yargs para la opción rm, el cual
 * dada una ruta concreta, elimina el directorio o el fichero.
 */
yargs.command({
    command: 'rm',
    describe: 'Elimina el directorio o fichero de la ruta especificada.',
    builder: {
        ruta: {
            describe: 'Ruta del directorio o fichero a eliminar.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.ruta === "string") {
            let entrada = argv.ruta;
            fs.access(entrada, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El directorio o fichero de la ruta especificada no existe.\n"));
                else {
                    const rm = child_process_1.spawn('rm', ['-rf', entrada]);
                    rm.on('close', (err) => {
                        if (err)
                            console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: Algo ha salido mal al intentar eliminar el directorio o fichero.\n"));
                        else
                            console.log(chalk.rgb(45, 247, 17).inverse("\nEl fichero o directorio ha sido eliminado satisfactoriamente.\n"));
                    });
                }
            });
        }
    },
});
/**
 * @description Comando de Yargs para la opción mv, el cual
 * dada una ruta de origen, mueve y copia un fichero a una ruta destino.
 */
yargs.command({
    command: 'mv',
    describe: 'Mueve y copia el fichero a la ruta especificada.',
    builder: {
        origen: {
            describe: 'Ruta origen del fichero.',
            demandOption: true,
            type: 'string',
        },
        destino: {
            describe: 'Ruta destino del fichero.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.origen === "string") && (typeof argv.destino === "string")) {
            let origen = argv.origen;
            let destino = argv.destino;
            fs.access(`${argv.origen}`, (err) => {
                if (err)
                    console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El fichero de la ruta especificada no existe.\n"));
                else {
                    let mv = child_process_1.spawn('cp', ['-r', origen, destino]);
                    console.log(chalk.rgb(45, 247, 17).inverse("\nEl fichero se ha movido y copiado de forma satisfactoria.\n"));
                }
            });
        }
    },
}).parse();
