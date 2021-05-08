import 'mocha';
import { expect } from 'chai';
import { Note } from '../src/note-app';

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