import { Reduce } from "./reduce";

/**
 * Clase SubReduce
 */
export class SubReduce extends Reduce {
  constructor(protected arrayReduce: number[]) {
    super(arrayReduce);
  }

  /**
   * Método operation para la resta
   * @return La suma del array
   */
  protected operation(): number {
    let total = 0;
    for(let i in this.arrayReduce) {
      total -= this.arrayReduce[i];
    }
    return total;
  }
}
/*
let resta: SubReduce = new SubReduce([3,4,5,6]);

console.log(resta.operation());
*/