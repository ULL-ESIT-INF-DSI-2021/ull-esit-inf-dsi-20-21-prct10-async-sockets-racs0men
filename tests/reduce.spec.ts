import 'mocha';
import { expect } from 'chai';
import { Reduce } from "../src/modificacion/reduce";
import { AddReduce } from "../src/modificacion/AddReduce";
import { SubReduce } from "../src/modificacion/SubReduce";
import { ProdReduce } from "../src/modificacion/ProdReduce";

//let suma: Reduce = new Reduce([3,4,5,6]);
let suma: AddReduce = new AddReduce([3,4,5,6]);
let resta: SubReduce = new SubReduce([3,4,5,6]);
let multi: ProdReduce = new ProdReduce([3,4,5,6]);

describe('Tests de Reduce:', () => {
/*
  it("Se puede hacer la suma de un array", () => {
    expect(suma).to.equal([3,4,5,6]);
  });
*/
/*
  it("Se puede crear un combatiente.", () => {
    expect(charizard).to.eql({ nombre: "Charizard", peso: 40, altura: 60, tipo: "fuego",
    ataque: 10, defensa: 15, velocidad: 10, hp: 100, universo: "Pokemon" });
  });
  it('Probando método combate entre dos pokemons.', () => {
    expect(combate2.combate("Pokemon", "Pokemon", 20)).to.eql(40);
  });
  it('Probando método combate entre universos distintos.', () => {
    expect(combate1.combate("Marvel", "DragonBall", 20)).to.eql(20);
  });
  it('Probando método start.', () => {
    expect(combate3.start()).to.eql("El ganador del combate entre universos es... ¡¡¡¡Superman!!!!");
  });
  it('Probando método getTipo().', () => {
    expect(charizard.getTipo()).to.be.equal('fuego');
  });
  it('Probando método getAtaque().', () => {
    expect(charizard.getAtaque()).to.be.equal(10);
  });
*/
});