import EventEmitter from "events";
import * as net from 'net';
import { RequestType } from "./types";
const chalk = require("chalk");


export class client extends EventEmitter {
  constructor(public puerto: number) {
    super()
  }

  run(client: net.Socket) {
    let wholeData = '';
    client.on('data', (dataChunk) => {
      wholeData += dataChunk;
    });
    
    client.on('end', () => {
      const info = JSON.parse(wholeData)
      switch (info.type) {
        case 'add':
          if(info.error)
            console.log(chalk.rgb(0, 255, 0).inverse("La nota ha sido añadida con éxito."));
          else
            console.log(chalk.rgb(255, 0, 0).inverse("ERROR: La nota ya existe."));
        break;
        case 'list':
          if(info.error) {
            info.notes.forEach((element: any) => {
              console.log(chalk.inverse.keyword(element.color)(element.title));
              console.log(chalk.inverse.keyword(element.color)(element.body));
            });
          }
          else
            console.log(chalk.rgb(255, 0, 0).inverse("ERROR: El usuario que ha introducido no existe."));
        break;
        case 'read':
          if(info.error) {
            console.log(chalk.inverse.keyword(info.notes[0].color)(info.notes[0].title));
            console.log(chalk.inverse.keyword(info.notes[0].color)(info.notes[0].body)); 
          }
          else
          console.log(chalk.rgb(255, 0, 0).inverse("ERROR: El usuario o la nota que ha introducido no existe."));
        break;
        case 'remove':
          if(info.error)
            console.log(chalk.rgb(0, 255, 0).inverse("La nota ha sido eliminata con correctamente."));
          else
            console.log(chalk.rgb(255, 0, 0).inverse("ERROR: La nota que quería eliminar no existe."));
        break;
        case 'modify':
          if(info.error)
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

  request(req: RequestType) {
    const client = net.connect({port: this.puerto});
    client.write(JSON.stringify(req)+'\n');
    this.run(client);
  }
}