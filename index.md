

# DESARROLLO DE SISTEMAS INFORMÁTICOS

<br/><br/>

## Práctica 8 - Aplicación de procesamiento de notas de texto

<br/><br/>

### Óscar Cigala Álvarez (alu0101038230@ull.edu.es)

<br/><br/>

### Índice:

1. [Introducción y objetivos.](#id1)
2. [Desarrollo.](#id2)
4. [Dificultades.](#id3)
5. [Conclusión.](#id4)
6. [Referencias.](#id5)

<br/><br/>

## 1. Introducción y objetivos. <a name="id1"></a>

En esta práctica toca resolver un ejercicio de programación en TypeScript que me permitirá adquirir unos conocimientos sobre la API síncrona que proporciona Node.js, además de trabajar con los paquetes **yargs** y **chalk** que nos ayudarán a interactuar mediante línea de comandos con nuestra herramienta.

<br/><br/>

## 2. Desarrollo. <a name="id2"></a>

Para el desarrollo de este ejercicio, lo primero que hice fue crear la clase `Note`, la cual será la encargada de crear una **nota**. Esta es muy simple, simplemente es un constructor que recibe 4 parámetros que debe tener cualquier nota para ser considerada como tal. El primero de ellos es `user` (nombre del usuario que ha creado la nota), `title` (nombre de la nota), `body` (cuerpo de la nota) y `color` (color de la nota).

```Typescript
  export class Note {

  public user: string;
  public title: string;
  public body: string;
  public color: string;

  constructor(user: string, title: string, body: string, color: string) {
    this.user = user;
    this.title = title;
    this.body = body;
    this.color = color;
  }
}
```

A continuación, pasamos al fichero `commands.ts` el cual es el principal de nuestra herramienta. Este se divide en 5 partes, una para cada comando. Primeramente comentaré el comando add, el cual añade una nota nueva a la carpeta del usuario especificado. Cuando se recibe este comando, se espera que venga acompañado de 4 parámetros más: user, title, body y color, siendo todas ellas de uso obligatorio y de tipo `string`. 

```TypeScript
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
```

Dentro de este comando se encuentra el manejador, lo primero que hice fue comprobar que el tipo de cada parámetro fuera `string`. Con `if (fs.existsSync('./src/ejercicio/users'))` compruebo que el directorio `users` exista, de no existir mostrará un mensaje de error en color rojo diciendo *ERROR: No existe el directorio users.* gracias al uso del paquete `chalk`. Si existe, pasamos al siguiente: `if (!fs.existsSync(./src/ejercicio/users/${argv.user})`, el cual comprueba que **NO** exista la carpeta correspondiente al usuario, de no existir, crea mediante `fs.mkdirSync(./src/ejercicio/users/${argv.user})` el directorio con el nombre que había almacenado en el parámetro `user`, además, muestra por pantalla un mensaje en color verde que confirma la creación de este directorio. Lo siguiente es comprobar que la nota que el usuario quiere crear no existiera ya para ese usuario en concreto. Esta comprobación se hace con `if (fs.existsSync(./src/ejercicio/users/${argv.user}/${argv.title}.json))`. Si esa nota aún no existe, pasa al `else` y la genera. Lo que hice fue crear un objeto `Note` al que le pasé los mismos valores que introdujo el usuario y haciendo uso de la función `JSON.stringify` almaceno en `aux` todo el contenido de `nota1` pero en formato **JSON**. Por último, mediante `fs.writeFileSync(./src/ejercicio/users/${argv.user}/${argv.title}.json, aux)` creo el fichero **JSON** con el título de la nota como nombre y pasándole como contenido la variable `aux`. Para finalizar, muestro de color verde un mensaje de confirmación.

```typescript
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
```

El segundo comando que hice fue `list`, el cual es la opción que lista todos los títulos de las notas que posee un usuario concreto. Esta opción solo recibe un parámetro: user, el cual es obligatorio y de tipo `string`.

```TypeScript
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
```

En los 5 comandos nos encontramos los mismos 3 `if` al principio de cada manejador ya que son las comprobaciones básicas, como ya fueron explicadas en el punto anterior, paso directamente al código nuevo. Lo primero que hice fue crear una variable llamada `directorio` que guardará el contenido del directorio que se llame igual al parámetro que introdujo el usuario. A continuación, mediante el `forEach()` recorro todo el contenido de este directorio, como dentro de este solo hay ficheros **JSON** (las notas), guardo en la variable `entrada` el contenido de la nota que toque en esa iteración, después en `toJson` creo una nota que almacena el contenido parseado ya a *JSON*. Esto me servirá para poder imprimir dentro del `switch()` el color correspondiente a la nota.

```TypeScript
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          let directorio = fs.readdirSync(`./src/ejercicio/users/${argv.user}`);
          directorio.forEach(nombreFichero => {
            let entrada = fs.readFileSync(`./src/ejercicio/users/${argv.user}/${nombreFichero}`);
            let toJson: Note = JSON.parse(entrada.toString());

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
```

El tercer comando que hice fue `read`, la cual es la encargada de mostrar el contenido completo de la nota que se le especifica. Esta opción espera recibir 2 parámetros: user y title, siendo ambas obligatorias y de tipo `string`.

```TypeScript
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
```

Al igual que antes, los 3 primeros `if` ya han sido explicados, pero el cuarto no. Con `if (fs.existsSync(./src/ejercicio/users/${argv.user}/${argv.title}.json)` lo que hago es comprobar que la nota que se ha introducido de verdad exista, en caso de no existir, se mostrará un mensaje de error en color rojo por consola. Si existe, hace exactamente lo mismo que en el `forEach()` que expliqué en el comando `list` con la única diferencia es que ahora el `switch` no solo imprimirá por pantalla el título si no también el cuerpo con el color de la nota.

```Typescript
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      if (fs.existsSync('./src/ejercicio/users')) {
        if (fs.existsSync(`./src/ejercicio/users/${argv.user}`)) {
          if (fs.existsSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`)) {
            let fichero = fs.readFileSync(`./src/ejercicio/users/${argv.user}/${argv.title}.json`);
            let toJson: Note = JSON.parse(fichero.toString());

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
```

El cuarto comando es `remove`, esta será la opción encargada de eliminar la nota que se le especifique y recibirá 2 parámetros: user y title, siendo ambas obligatorias y de tipo `string`.

```Typescript
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
```

Como ha pasado con anterioridad, los 4 primeros `if` ya han sido explicados así que paso a la única función nueva. Esta es `fs.rmSync(./src/ejercicio/users/${argv.user}/${argv.title}.json)` la cual elimina ficheros o directorios que se le especifican, como quiero eliminar un fichero hago uso de `${argv.title}.json` ya que este será la nota que el usuario quiera eliminar. Después, simplemente muestro por pantalla un mensaje de confirmación para verificar la acción.

```Typescript
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
```

Para finalizar, este es el quinto y último comando que he diseñado, corresponde a la opción `modify` y como su propio nombre indica permite modificar la nota que queramos. Este comando espera 4 parámetros: user, title, body y color de la nota, siendo todas ellas de uso obligatorio y de tipo `string`.

```Typescript
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
```

Como en el apartado anterior, los 4 primeros `if` ya han sido explicados. Como hay que modificar una nota, lo primero que hago es eliminarla y después crearla de nuevo con los nuevos valores. Por ello, simplemente copié y pegué el contenido de la opción `remove` seguida de la opción `add`, las cuales fueron explicadas en sus apartados correspondientes. Por último, muestro por pantalla un mensaje de color verde que confirma que la operación se ha realizado.

```Typescript
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
})
```

Las pruebas que hice para esta práctica se encuentran a continuación. Como no cree ningún método, lo que hago es comprobar que es posible crear notas, que estas no son nulas y que se puede acceder de forma correcta a los distintos valores que posee una nota.

```typescript
import 'mocha';
import { expect } from 'chai';
import { Note } from '../src/ejercicio/note-app';

let nota1: Note = new Note("oscarca", "Red note", "This is a red note", "red");

describe('Test clase Note:', () => {
  describe('Es posible crear notas:', () => {
    it('Instancia de la nota:', () => {
      expect(nota1).to.exist;
    });
    it('Instancia de la nota no es nula:', () => {
      expect(nota1).not.null;
    });
  });
  describe('Es posible obtener los valores de una nota:', () => {
    it('Se puede obtener el usuario de una nota:', () => {
      expect(nota1.user).to.be.equal('oscarca');
    });
    it('Se puede obtener el título de una nota:', () => {
      expect(nota1.title).to.be.equal('Red note');
    });
    it('Se puede obtener el cuerpo de una nota:', () => {
      expect(nota1.body).to.be.equal('This is a red note');
    });
    it('Se puede obtener el color de una nota:', () => {
      expect(nota1.color).to.be.equal('red');
    });
  });
});
```

Esto es lo que muestra por consola si ejecutamos `npm test`:

![Foto1](images/1.PNG)

<br/><br/>

## 3. Dificultades. <a name="id3"></a>

En general, el desarrollo de esta práctica ha sido bueno. La principal dificultad que tuve fue entender bien la API de Node.js, pero tras pedir una tutoría con el profesor todo me quedó más claro y pude hacerlo todo bien.

<br/><br/>

## 4. Conclusión. <a name="id4"></a>

Tras la finalización de esta práctica, hemos conseguido obtener bastante conocimiento con el uso de los paquetes **yargs** y **chalk**, además de familiarizarnos con la API síncrona que nos proporciona Node.js para trabajar con el sistema de ficheros.

<br/><br/>

## 5. Referencias. <a name="id5"></a>
1. [Github.](http://github.com)
2. [Mi repositorio para esta práctica.](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-racs0men)
3. [Enunciado Práctica 8.](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)
4. [Documentación GitHub Actions](https://docs.github.com/en/actions)
5. [Documentación Istanbul](https://istanbul.js.org/)
6. [Documentación Coveralls](https://coveralls.io/)
7. [Documentación de TypeDoc.](https://typedoc.org/)
8. [Documentación de Mocha.](https://mochajs.org/)
9. [Documentación de Chai.](https://www.chaijs.com/)
10. [Documentación de Yargs.](https://www.npmjs.com/package/yargs)
11. [Documentación de Chalk.](https://www.npmjs.com/package/chalk)