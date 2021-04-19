import { Reduce } from "./reduce";

/**
 * Clase AddReduce
 */
export class AddReduce extends Reduce {
  constructor(protected arrayReduce: number[]) {
    super(arrayReduce);
  }

  /**
   * Método operation para la suma
   * @return La suma del array
   */
  protected operation(): number {
    let total = 0;
    for(let i in this.arrayReduce) {
      total += this.arrayReduce[i];
    }
    return total;
  }
}

/*
let suma: AddReduce = new AddReduce([3,4,5,6]);

console.log(suma.operation());
*/