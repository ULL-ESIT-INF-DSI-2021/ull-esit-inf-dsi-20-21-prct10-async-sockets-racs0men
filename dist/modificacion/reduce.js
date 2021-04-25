"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Clase Reduce
 */
class Reduce {
    constructor(arrayReduce) {
        this.arrayReduce = arrayReduce;
    }
    /**
     * Template method that defines the skeleton of an Reduce Algorithm.
     */
    run() {
        this.beforeOperation();
        this.operation();
        this.afterOperation();
    }
    /**
     * Empty operations that could be implemented by subclasses (not
     * mandatory)
     */
    afterOperation() { }
    beforeOperation() { }
}
exports.Reduce = Reduce;
