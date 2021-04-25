import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import { Note } from './note-app'

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
        (typeof argv.body === 'string') && (typeof argv.color === 'string')) {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (!fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          fs.mkdirSync(`./src/ejercicio/users/${argv.user}`);
          console.log(chalk.rgb(45, 247, 17).inverse(`El usuario ${argv.user}
           no existía, se ha creado su carpeta.`));
        }
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`)) {
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: Esa nota ya existe en el usuario ${argv.user}.`));
        }
        else {
          let nota1: Note = new Note(argv.user, argv.title, argv.body, argv.color);
          let aux = JSON.stringify(nota1); //aux ahora es nota1.json
          fs.writeFileSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`, aux);
          console.log(chalk.rgb(45, 247, 17).inverse(`Nota ${argv.title} creada correctamente.`));
        }
      }
      else
        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: No existe el directorio users."));
    }
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
    if (typeof argv.user === 'string') {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          let directorios = fs.readdirSync(`./src/ejercicio/users/${argv.user}`);
          directorios.forEach(nombreFichero => {
            let entrada = fs.readFileSync(`./src/ejercicio/users/${argv.user}/${nombreFichero}`);
            let toJson: Note = JSON.parse(entrada.toString());
            //let titulo: string = objeto.getTitle();
            //console.log(toJson.title);

            switch (toJson.color) {
              case 'red':
                console.log(chalk.red.inverse(toJson.title));
                break;
              case 'blue':
                console.log(chalk.blue.inverse(toJson.title));
                break;
              case 'yellow':
                console.log(chalk.yellow.inverse(toJson.title));
                break;
              case 'green':
                console.log(chalk.green.inverse(toJson.title));
                break;
              default:
                console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: No existe el color ${toJson.color}.`));
                break;  
            }
          });
        }
        else
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El usuario ${argv.user} no existe.`));
      }
      else
        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: No existe el directorio users."));
    }
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
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          if (fs.existsSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`)) {
            let fichero = fs.readFileSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`);
            let toJson: Note = JSON.parse(fichero.toString());
            //let titulo: string = objeto.getTitle();

            switch (toJson.color) {
              case 'red':
                console.log(chalk.red.inverse(toJson.title));
                console.log(chalk.red.inverse(toJson.body));
                break;
              case 'blue':
                console.log(chalk.blue.inverse(toJson.title));
                console.log(chalk.blue.inverse(toJson.body));
                break;
              case 'yellow':
                console.log(chalk.yellow.inverse(toJson.title));
                console.log(chalk.yellow.inverse(toJson.body));
                break;
              case 'green':
                console.log(chalk.green.inverse(toJson.title));
                console.log(chalk.green.inverse(toJson.body));
                break;
              default:
                console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: No existe el color ${toJson.color}.`));
                break;  
            }
          }
          else
            console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: La nota ${argv.title} no existe.`));
        }
        else 
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El usuario ${argv.user} no existe.`));
      }
      else
        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: No existe el directorio users."));
    }
  },
});

/**
 * @description Comando de Yargs para la opción remove,el cual
 * elimina una nota nueva de la carpeta del usuario especificado.
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
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          if (fs.existsSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`)) {
            fs.rmSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`);
            console.log(chalk.rgb(45, 247, 17).inverse(`La nota ${argv.title} ha sido eliminada correctamente.`));
          }
          else
            console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: La nota ${argv.title} no existe.`));
        }
        else 
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El usuario ${argv.user} no existe.`));
      }
      else
        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: No existe el directorio users."));
    }
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
        (typeof argv.body === 'string') && (typeof argv.color === 'string')) {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          if (fs.existsSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`)) {
            fs.rmSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`);
            let nota1: Note = new Note(argv.user, argv.title, argv.body, argv.color);
            let aux = JSON.stringify(nota1); //aux ahora es nota1.json
            fs.writeFileSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`, aux);

            console.log(chalk.rgb(45, 247, 17).inverse(`La nota ${argv.title} ha sido modificada correctamente.`));
          }
          else
            console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: La nota ${argv.title} no existe.`));
        }
        else 
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El usuario ${argv.user} no existe.`));
      }
      else
        console.log(chalk.rgb(255, 0, 0).inverse("ERROR: No existe el directorio users."));
    }
  },
}).parse();
