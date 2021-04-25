"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = require("./reduce");
/**
 * Clase SubReduce
 */
class ProdReduce extends reduce_1.Reduce {
    constructor(arrayReduce) {
        super(arrayReduce);
        this.arrayReduce = arrayReduce;
    }
    /**
     * Método operation para la multiplicación
     * @return La suma del array
     */
    operation() {
        let total = 0;
        for (let i in this.arrayReduce) {
            total *= this.arrayReduce[i];
        }
        return total;
    }
}
exports.ProdReduce = ProdReduce;
let multi = new ProdReduce([3, 4, 5]);
console.log(multi.operation());
