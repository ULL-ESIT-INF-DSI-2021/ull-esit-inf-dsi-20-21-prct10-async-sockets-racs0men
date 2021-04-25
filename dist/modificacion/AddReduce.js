"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = require("./reduce");
/**
 * Clase AddReduce
 */
class AddReduce extends reduce_1.Reduce {
    constructor(arrayReduce) {
        super(arrayReduce);
        this.arrayReduce = arrayReduce;
    }
    /**
     * Método operation para la suma
     * @return La suma del array
     */
    operation() {
        let total = 0;
        for (let i in this.arrayReduce) {
            total += this.arrayReduce[i];
        }
        return total;
    }
}
exports.AddReduce = AddReduce;
/*
let suma: AddReduce = new AddReduce([3,4,5,6]);

console.log(suma.operation());
*/ 
