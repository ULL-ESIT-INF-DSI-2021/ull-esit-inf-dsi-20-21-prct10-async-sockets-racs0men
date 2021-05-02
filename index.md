

# DESARROLLO DE SISTEMAS INFORMÁTICOS

<br/><br/>

## Práctica 9 - Sistema de ficheros y creación de procesos en Node.js

<br/><br/>

### Óscar Cigala Álvarez (alu0101038230@ull.edu.es)

<br/><br/>

### Índice:

1. [Introducción y objetivos.](#id1)
2. [Ejercicios.](#id2)
  
      2.1. [Ejercicio 1.](#id21)

      2.2. [Ejercicio 2.](#id22)

      2.3. [Ejercicio 3.](#id23)

      2.4. [Ejercicio 4.](#id24)

4. [Dificultades.](#id3)
5. [Conclusión.](#id4)
6. [Referencias.](#id5)

<br/><br/>

## 1. Introducción y objetivos. <a name="id1"></a>

En esta práctica toca resolver 4 ejercicios de programación en TypeScript que me permitirá adquirir unos conocimientos sobre la API asíncrona y la de callbacks que proporciona Node.js, además de trabajar con los paquetes **yargs** y **chalk** que nos ayudarán a interactuar mediante línea de comandos con nuestra herramienta.

<br/><br/>

## 2. Ejercicios. <a name="id2"></a>
### 2.1. Ejercicio 1. <a name="id21"></a>

En este primer ejercicio, se nos pide que realicemos una traza de ejecución paso a paso del siguiente código: 

```Typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

- **Paso 1:** Inicializamos las 4 colas a vacías:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  |  |

- **Paso 2:** La función `main()` entra a la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `main()` |  |  |  |

Ahora, pueden ocurrir dos cosas dependiendo de si se cumple o no que `process.argv.lenght` sea distinto de 3. Si se cumple el `if` pasa lo siguiente: 

- **Paso 3:** Introducimos `console.log('Please, specify a file')` a la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `main()` |  |  |  |
| `console.log(Please,...)` |  |  |  |

- **Paso 4:** Sacamos `console.log('Please, specify a file')` de la pila de llamadas y se imprime por pantalla su mensaje:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `main()` |  |  | `console.log(Please,...)` |

- **Paso 5:** Sale `main()` de la pila de llamadas y se acaba el programa:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  | `console.log(Please,...)` |


Si el `if` no se cumple, entramos al `else` y pasa lo siguiente:

- **Paso 3:** Introducimos `access()` a la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `main()` |  |  |  |
| `access()` |  |  |  |

- **Paso 4:** `access()` sale de la pila de llamadas y entra en el registro de eventos de la API:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `main()` | `access()` |  |  |

- **Paso 5:** La función `main()` sale de la pila de llamadas. Justo después de esto, `access()` sale de la API y entra en la cola de manejadores:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  | `access()` |  |

- **Paso 6:** Al estar vacía la pila de llamadas, `access()` entra a esta :

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  |  |

- **Paso 7:** Se ejecuta `access()` y entra a la pila de llamadas `console.log(Starting to watch file ${filename})`:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  |  |
| `console.log(Starting...)` |  |  |  |

- **Paso 8:** Se ejecuta `console.log(Starting to watch file ${filename})`, sale de la pila de llamadas y se muestra por consola su mensaje:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  | `console.log(Starting...)` |

- **Paso 9:** La función `watch(process.argv[2])` entra a la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  | `console.log(Starting...)` |
| `watch(process.argv[2])` |  |  |  |

- **Paso 10:** La función `watch(process.argv[2])` se ejecuta y como no es un forEach(), sale de la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  | `console.log(Starting...)` |

- **Paso 11:** La función `watcher.on()` entra en la pila de llamadas:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` |  |  | `console.log(Starting...)` |
| `watcher.on()` |  |  |  |

- **Paso 12:** La función `watcher.on()` sale de la pila de llamadas y entra al registro de eventos de la API:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` | `watcher.on()` |  | `console.log(Starting...)` |

- **Paso 13:** La función `watcher.on()` esperará a que se produzca algún cambio en ese fichero, así que ahora entra a la pila de llamadas `console.log(File ${filename} is no longer watched)`:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` | `watcher.on()` |  | `console.log(Starting...)` |
| `console.log(File... watched)` |  |  |  |

- **Paso 14:** La función `console.log(File ${filename} is no longer watched)` se ejecuta, sale de la pila de llamadas y se muestra por consola su mensaje:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `anonymous(access())` | `watcher.on()` |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |

- **Paso 15:** Como ya hemos recorrido todo el código, sale de la pila de llamadas `anonymous(access())` y el programa se quedará esperando a que editemos el fichero que le pasamos. Como en la práctica nos piden que como mínimo lo modifiquemos dos veces, ahora lo editaremos por primera vez. Tras esto, la función `watcher.on()` que estaba a la espera, reconocerá la modificación mandando a la cola de manejadores lo siguiente: `console.log(File ${filename} has been modified somehow)`:

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  | `watcher.on()` | `console.log(File ... somehow)` | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |

- **Paso 16:** Ahora el manejador detecta que tiene un `console.log()` y lo manda a la cola de llamadas: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `console.log(File ... somehow)` | `watcher.on()` |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |

- **Paso 17:** El `console.log(File ${filename} has been modified somehow)` se ejejuta y sale de la cola de llamadas, mostrandose por consola su contenido: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  | `watcher.on()` |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |
|  |  |  | `console.log(File ... somehow)` |

- **Paso 18:** Editamos el fichero por segunda vez y ocurriría lo mismo que en el paso 15: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  | `watcher.on()` | `console.log(File ... somehow)` | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |
|  |  |  | `console.log(File ... somehow)` |

- **Paso 19:** Ahora el manejador detecta que tiene un `console.log()` y lo manda a la cola de llamadas: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `console.log(File ... somehow)` | `watcher.on()` |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |
|  |  |  | `console.log(File ... somehow)` |

- **Paso 20:** El `console.log(File ${filename} has been modified somehow)` se ejejuta y sale de la cola de llamadas, mostrandose por consola su contenido: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  | `watcher.on()` |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |
|  |  |  | `console.log(File ... somehow)` |
|  |  |  | `console.log(File ... somehow)` |

- **Paso 21:** Tras haberlo editado dos veces, cerramos el programa y `watcher.on()` saldrá del registro de eventos de la API y daremos por finalizado el ejercicio al no quedar nada en ninguna pila ni cola: 

| **CALL STACK** | **NODE.JS API** | **CALLBACK QUEUE** | **CONSOLE** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  | `console.log(Starting...)` |
|  |  |  | `console.log(File... watched)` |
|  |  |  | `console.log(File ... somehow)` |
|  |  |  | `console.log(File ... somehow)` |


<br/><br/>

### 2.2. Ejercicio 2. <a name="id22"></a>

En este segundo ejercicio, lo primero que hice fue crear el comando `analyze`, el cual está diseñado para recibir hasta 5 parámetros por consola: `pipe`(Para activar o desactivar el método pipe, solo tienes que poner "si" para usarlo y "no" para no usarlo), `fichero`(El fichero que quieres analizar), `lineas`(El número de líneas que posee el fichero), `palabras`(El número de palabras que posee el fichero) y `caracteres`(El número de caracteres que posee el fichero). Las dos primeras opciones son obligatorias, mientras que las siguientes 3 son opcionales, puedes pedir solo las líneas, las líneas y las palabras o lo que quieras. 

```Typescript
 yargs.command( {
  command: 'analyze',
  describe: 'Muestra por consola el número de líneas, palabras y caracteres que posee un fichero que se le pase como parámetro.',
  builder: {
    pipe: {
      describe: 'Opción para activar o desactivar el método pipe.',
      demandOption: true,
      type: 'string',
    },
    fichero: {
      describe: 'Fichero que se quiere analizar.',
      demandOption: true,
      type: 'string',
    },
    lineas: {
      describe: 'Opción para contar el número de líneas que posee el fichero.',
      demandOption: false,
      type: 'boolean',
    },
    palabras: {
      describe: 'Opción para contar el número de palabras que posee el fichero.',
      demandOption: false,
      type: 'boolean',
    },
    caracteres: {
      describe: 'Opción para contar el número de caracteres que posee el fichero.',
      demandOption: false,
      type: 'boolean',
    },
  },
```

Ahora llegamos al manejador del comando, lo primero que hago es comprobar que el tipo de `pipe` y de `fichero` sea `string`. Después detecto si en `pipe` el usuario introdujo "si" o "no", en caso de no detectar una respuesta correcta devuelve un mensaje de error en color rojo. Si detecta un "si" llama a la función `conPipe()` y en caso contrario a la función `sinPipe()`. Los siguientes `if` sirven para saber qué parámetros opcionales quiso introducir el usuario y así mostrarlo de forma correcta.

```Typescript
  handler(argv) {
    if ((typeof argv.pipe === "string") && (typeof argv.fichero === "string")) {

      let comando: string[] = [];

      if ((argv.pipe == "si") || (argv.pipe == "Si"))
        conPipe(comando, argv.fichero);
      else if ((argv.pipe == "no") || (argv.pipe == "No"))
        sinPipe(comando, argv.fichero);
      else
        console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: Ha introducido mal el parámetro pipe, por favor, introduzca Si o No.\n"));

      if (argv.lineas == true)
        comando.push("lineas");
      if (argv.palabras == true)
        comando.push("palabras");
      if (argv.caracteres == true)
        comando.push("caracteres");
      if (comando.length == 0)
        console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: No ha introducido ninguna opción a analizar.\n"));
    }
  },
}).parse();
```

Lo siguiente que explicaré es el método `conPipe()`, que, como ya he dicho antes, se ejecuta solo si el usuario introdujo un sí en el parámetro `pipe`. Lo primero que compruebo es que mediante la función `fs.access()` que se pueda acceder al fichero que ha pasado el usuario, en caso de no poder se mostrará por pantalla un mensaje de error. En el otro caso de que sí se pueda acceder, primero declaro `echo`, que es el encargado de mostrar el contenido del fichero y después `wc` que es el proceso encargado de mostrar el número de líneas. Luego añadimos los datos que genera ese proceso a `wcOutput` gracias a la función `wc.stdout.on('data')`. Con la función `.on('close')` mostramos el resultado del proceso, si el usuario introdujo solo como parámetro a líneas, con el `if` comprobamos que lo introdujo e imprime por pantalla el número de líneas, lo mismo sería para palabras y letras.

```typescript
function conPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El fichero que ha introducido no existe.\n"));
    else {
      let echo = spawn('echo', [`\nAbriendo el fichero: ${nombreFichero}\n`]);
      let wc = spawn('wc', [`${nombreFichero}`]);
      echo.stdout.pipe(process.stdout);
      let wcOutput  = '';
      wc.stdout.on('data', (piece) => wcOutput  += piece);

      wc.on('close', () => {
        let outputArray = wcOutput .split(/\s+/);
        entrada.forEach((element) => {
          if (element == "lineas") {
            const echo = spawn('echo', [`El fichero contiene ${parseInt(outputArray[1])+1} líneas.\n`]);
            echo.stdout.pipe(process.stdout);
          }
          if (element == "palabras") {
            const echo = spawn('echo', [`El fichero contiene ${outputArray[2]} palabras.\n`]);
            echo.stdout.pipe(process.stdout);
          }
          if (element == "caracteres") {
            const echo = spawn('echo', [`El fichero contiene ${outputArray[3]} caracteres.\n`]);
            echo.stdout.pipe(process.stdout);
          }
        });
      });
    }
  });
}
```

A continuación, pasamos a la función `sinPipe()`, la cual hace exactamente lo mismo que el método anterior pero sin hacer uso del método `pipe` de un `Stream`. Al principio hago lo mismo solo que a la hora de mostrarlo no hago uso de `spawn('echo')` si no de simplemente `console.log()`.

```typescript
function sinPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El fichero que ha introducido no existe.\n"));
    else {
      let wc = spawn('wc', [`${nombreFichero}`]);
      console.log(`\n${nombreFichero}\n`);
      let wcOutput  = '';
      wc.stdout.on('data', (piece) => wcOutput  += piece);

      wc.on('close', () => {
        const outputArray = wcOutput .split(/\s+/);
        entrada.forEach((element) => {
          if (element == "lineas")
            console.log(`El fichero contiene ${parseInt(outputArray[1])+1} líneas.\n`);
          if (element == "palabras")
            console.log(`El fichero contiene ${outputArray[2]} palabras.\n`);
          if (element == "caracteres")
            console.log(`El fichero contiene ${outputArray[3]} caracteres.\n`);
        });
      });
    }
  });
}
```

<br/><br/>

### 2.3. Ejercicio 3. <a name="id23"></a>

Este ejercicio fue bastante sencillo, lo primero que hice fue crear el comando `watcher`, el cual controlará los cambios realizados sobre el directorio especificado. Este comando recibirá de forma obligatoria 2 parámetros: `describe` y `ruta` los cuales también tienen que ser obligatoriamente de tipo `string`.

```Typescript
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
```

En el manejador es donde he desarrollado la funcionalidad del comando. Lo primero que hago es mediante el primer `if`, comprobar que ambos parámetros sean de tipo `string`. Lo siguiente que compruebo es que mediante la función `fs.access()` que se pueda acceder al fichero que ha pasado el usuario, en caso de no poder se mostrará por pantalla un mensaje de error. En caso de que todo vaya bien, entra al `else` que se mantendrá a la espera de detectar cualquier cambio en el directorio que observe e indicará si se ha añadido algo, eliminado o modificado. 

```Typescript
  handler(argv) {
    if ((typeof argv.usuario === 'string') && (typeof argv.ruta === 'string')) {
      fs.access(`./${argv.ruta}/${argv.usuario}`, constants.F_OK, (err) => {
        if (err)
          console.log(chalk.rgb(255, 0, 0).inverse(`ERROR: El directorio del usuario ${argv.usuario} no existe.`));
        else {
          const look = chokidar.watch(`./${argv.ruta}/${argv.usuario}`);
          console.log(chalk.blue.inverse(`Iniciando la observación del directorio: ${argv.ruta}/${argv.usuario}`));
          look.on('add', (file, _) => {
            if ( fs.existsSync(file))
              console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la creación de la nota ${file}.`));
          });
          look.on('remove', (file) => {
            console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la eliminación de la nota ${file}.`));
          });
          look.on('modify', (file, _) => {
            if ( fs.existsSync(file))
              console.log(chalk.rgb(45, 247, 17).inverse(`Se ha detectado la modificación de la nota ${file}.`));
          });
        }
      });
    }
  },
}).parse();
```

<br/><br/>

### 2.4. Ejercicio 4. <a name="id24"></a>

En este último ejercicio desarrollé 6 comandos, uno para cada operación que nos piden en la práctica. El primero que hice fue el comando `dirorfile` el cual dada una ruta concreta, muestra si es un directorio o un fichero. Recibe un único parámetro por consola el cual es la ruta de ese directorio o fichero, el cual es obligatorio que se ponga.

```Typescript
yargs.command( {
  command: 'dirorfile',
  describe: 'Comprueba si la ruta especificada es un directorio o un fichero.',
  builder: {
    ruta: {
      describe: 'Ruta del directorio o fichero.',
      demandOption: true,
      type: 'string',
    },
  },
```

En el manejador, paso directamente al `else` ya que lo anterior ha sido explicado en numerosas veces en este informe. Lo que hice fue mediante el uso de la función `fs.open()`, comprobar si es un fichero o no, ya que si lo pudo abrir, es que era un fichero y si pues un directorio.

```Typescript
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
```

El segundo comando que implementé fue `mkdir`, el cual dada una ruta concreta, crea un nuevo directorio. Solo recibe como parámetro la ruta especificada y es obligatoria.

```typescript
yargs.command( {
  command: 'mkdir',
  describe: 'Crea un directorio nuevo a partir de la ruta especificada.',
  builder: {
    ruta: {
      describe: 'Ruta del directorio y su nombre.',
      demandOption: true,
      type: 'string',
    },
  },
```

Lo único que hago aquí es hacer uso de la función `fs.mkdir()`, la cual crea un directorio gracias a que en `entrada` guardamos la ruta.

```typescript
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
```

El tercer comando es `list`, el cual, dada una ruta concreta, lista todos los ficheros que hay en el directorio. Como en los dos casos anteriores, solo recibe un parámetro con la ruta específica, el cual es `ruta` y es obligatorio.

```typescript
yargs.command( {
  command: 'list',
  describe: 'Lista los ficheros que hay en el directorio especidicado.',
  builder: {
    ruta: {
      describe: 'Ruta del directorio.',
      demandOption: true,
      type: 'string',
    },
  },
```

En el manejador, hago uso de la función `ls` que nos ofrece `spawn()` la cual muestra el contenido de la ruta que le digamos.

```typescript
  handler(argv) {
    if (typeof argv.ruta === "string") {
      let entrada = argv.ruta;
      fs.access(entrada, (err) => {
        if (err)
          console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El directorio con la ruta especificada no existe.\n"));
        else {
          console.log(chalk.rgb(45, 247, 17).inverse("\nListando los ficheros que hay en el directorio:\n"));
          const ls = spawn('ls', [entrada]);
          ls.stdout.pipe(process.stdout);
        }
      });
    }
  },
});
```

El cuarto comando que desarrollé fue `cat`, el cual dada una ruta concreta, muestra el contenido de un fichero. Recibe solo un parámetro de forma obligatoria, el cual es `ruta` con la ruta específica.

```typescript
yargs.command( {
  command: 'cat',
  describe: 'Muestra el contenido de un fichero',
  builder: {
    ruta: {
      describe: 'Ruta del fichero al qu ese quiere acceder.',
      demandOption: true,
      type: 'string',
    },
  },
```

Lo que hago es casi igual que el comando anterior, solo que en vez de hacer uso de `ls`, hago uso de `cat`, el cual me muestra todo el contenido de un directorio.

```typescript
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
              const cat = spawn('cat', [entrada]);
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
```

El quinto comando es `rm`, este se encargará de dada una ruta concreta, eliminar el directorio o fichero que se indique al final de la ruta.

```typescript
yargs.command( {
  command: 'rm',
  describe: 'Elimina el directorio o fichero de la ruta especificada.',
  builder: {
    ruta: {
      describe: 'Ruta del directorio o fichero a eliminar.',
      demandOption: true,
      type: 'string',
    },
  },
```

El manejador hace uso de la función `spawn()` como en casos anteriores, pero en este caso con las opciones de rm y -rf que se encarga de eliminar ficheros y directorios recursivamente y sin preguntar, así que hay que tener cuidado al usar este comando.

```typescript
  handler(argv) {
    if (typeof argv.ruta === "string") {
      let entrada = argv.ruta;
      fs.access(entrada, (err) => {
        if (err)
          console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El directorio o fichero de la ruta especificada no existe.\n"));
        else {
          const rm = spawn('rm', ['-rf', entrada]);
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
```

Por último, este el el comando `mv`, el cual dada una ruta origen, mueve y copia un fichero o un directorio a una ruta destino. Este comando recibe 2 parámetros, el primero es `origen` (con la ruta donde está actualmente el fichero/directorio) y el segundo es `destino` (con la ruta final del fichero/directorio).

```typescript
yargs.command( {
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
```

Al igual que en casos anteriores, hice uso de la función `spawn()` pero esta vez con la opción cp y -r, la cual copia un fichero o directorio y todo su contenido de la dirección origen a la de destino.

```typescript
  handler(argv) {
    if ((typeof argv.origen === "string") && (typeof argv.destino === "string")) {
      let origen = argv.origen;
      let destino = argv.destino;
      fs.access(`${argv.origen}`, (err) => {
        if (err)
          console.log(chalk.rgb(255, 0, 0).inverse("\nERROR: El fichero de la ruta especificada no existe.\n"));
        else {
          let mv = spawn('cp', ['-r', origen, destino])
          console.log(chalk.rgb(45, 247, 17).inverse("\nEl fichero se ha movido y copiado de forma satisfactoria.\n"));
        }
      });
    }
  },
}).parse();
```

<br/><br/>


## 3. Dificultades. <a name="id3"></a>

En general, el desarrollo de esta práctica ha sido bueno. La principal dificultad que tuve fue entender bien el ejercicio número 1, pero tras mirar documentación y repasar lo que dimos en clase me quedó más claro y pude hacerlo todo bien.

<br/><br/>

## 4. Conclusión. <a name="id4"></a>

Tras la finalización de esta práctica, hemos conseguido indagar aún más en el uso de los paquetes **yargs** y **chalk**, además de familiarizarnos con la API asíncrona que nos proporciona Node.js para trabajar con el sistema de ficheros y con la API de callbacks que también nos proporciona Node.js.

<br/><br/>

## 5. Referencias. <a name="id5"></a>
1. [Github.](http://github.com)
2. [Mi repositorio para esta práctica.](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-racs0men)
3. [Enunciado Práctica 9.](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/)
4. [Documentación GitHub Actions](https://docs.github.com/en/actions)
5. [Documentación Istanbul](https://istanbul.js.org/)
6. [Documentación Coveralls](https://coveralls.io/)
7. [Documentación de TypeDoc.](https://typedoc.org/)
8. [Documentación de Mocha.](https://mochajs.org/)
9. [Documentación de Chai.](https://www.chaijs.com/)
10. [Documentación de Yargs.](https://www.npmjs.com/package/yargs)
11. [Documentación de Chalk.](https://www.npmjs.com/package/chalk)
12. [API de callbacks de Node.js](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api)
13. [API asíncrona de Node.js](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creation)