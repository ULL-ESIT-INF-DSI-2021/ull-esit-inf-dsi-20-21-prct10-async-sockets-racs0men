"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = require("./reduce");
/**
 * Clase SubReduce
 */
class SubReduce extends reduce_1.Reduce {
    constructor(arrayReduce) {
        super(arrayReduce);
        this.arrayReduce = arrayReduce;
    }
    /**
     * Método operation para la resta
     * @return La suma del array
     */
    operation() {
        let total = 0;
        for (let i in this.arrayReduce) {
            total -= this.arrayReduce[i];
        }
        return total;
    }
}
exports.SubReduce = SubReduce;
/*
let resta: SubReduce = new SubReduce([3,4,5,6]);

console.log(resta.operation());
*/ 
