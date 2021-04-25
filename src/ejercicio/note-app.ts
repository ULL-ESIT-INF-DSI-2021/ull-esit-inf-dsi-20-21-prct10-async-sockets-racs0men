/**
 * @description Esta es la clase Note, representa una nota. 
 */
 export class Note {

  public user: string;
  public title: string;
  public body: string;
  public color: string;

  /**
   * @description Constructor de la clase Note
   * @param user Nombre del usuario que ha creado la nota.
   * @param title Nombre de la nota.
   * @param body Cuerpo de la nota (su contenido).
   * @param color Color de la nota.
   */
  constructor(user: string, title: string, body: string, color: string) {
    this.user = user;
    this.title = title;
    this.body = body;
    this.color = color;
  }
}

