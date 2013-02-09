/*!
 * Simple Matrix v0.1.0 
 *
 * Copyright (c) 2013 westzaki
 * Released under MIT license
 */
(function(window) {
    /**
     * constructor
     */
    var Matrix = function(array) {
        if (!(array instanceof Array) ||
            array.length === 0 ||
            !(array[0] instanceof Array) ||
            array[0].length === 0) {
            throw new Error('invalid argument');
        }

        this.col = array.length;
        this.row = array[0].length;
        this.val = [];

        var i, j;
        for (i = 0; i < this.col; i++) {
            if (this.row !== array[i].length) {
                throw new Error('invalid argument');
            }
            this.val[i] = [];
            for (j = 0; j < this.row; j++) {
                this.val[i][j] = array[i][j];
            }
        }
    };
    
    Matrix.prototype = {
        
        /**
         * Get the number of rows
         */
        getRowSize: function() {
            return this.row;
        },

        /**
         * Get the number of columns
         */
        getColSize: function() {
            return this.col;
        },

        /**
         * Get element of this matrix
         */
        getVal: function(col, row) {
            if (typeof col === 'undefined' ||
                typeof row === 'undefined' ||
                col < 0 ||
                row < 0 ||
                col > this.col ||
                row > this.row) {
                throw new Error('invalid argument');
            }
            return this.val[col][row];
        },
        

        /**
         * Add a matrix to this matrix
         */
        add: function(matrix) {
            if (!(matrix instanceof Matrix)) {
                throw new Error('invalid argument');
            }
            if (matrix.col !== this.col ||
                matrix.row !== this.row) {
                throw new Error('input matrix size is wrong');
            }

            var newVal = [],
                i, j;
            for (i = 0; i < this.col; i++) {
                newVal[i] = [];
                for (j = 0; j < this.row; j++) {
                    newVal[i][j] = matrix.val[i][j] + this.val[i][j];
                }
            }
            
            return new Matrix(newVal);
        },

        /**
         * Subtruct a matrix from this matrix
         */
        sub: function(matrix) {
            return this.add(matrix.scalar(-1));
        },

        /**
         * Scalar multiple
         */
        scalar: function(n) {
            if (typeof n !== 'number') {
                throw new Error('invalid argument');
            }

            var newVal = [],
                i, j;
            for (i = 0; i < this.col; i++) {
                newVal[i] = [];
                for (j = 0; j < this.row; j++) {
                    newVal[i][j] = n * this.val[i][j];
                }
            }

            return new Matrix(newVal);
        },

        /**
         * Multiple 2 matrix
         */
        mul: function(matrix) {
            if (!(matrix instanceof Matrix)) {
                throw new Error('invalid argument');
            }
            if (matrix.col !== this.row) {
                throw new Error('input matrix size is wrong');
            }

            var newVal = [],
                i, j, k;
            for (i = 0; i < this.col; i++) {
                newVal[i] = [];
                for (j = 0; j < matrix.row; j++) {
                    var temp = 0;
                    for (k = 0; k < this.row; k++) {
                        temp += this.val[i][k] * matrix.val[k][j];
                    }
                    newVal[i][j] = temp;
                }
            }

            return new Matrix(newVal);
        },

        /**
         * Return a copy of this matrix
         */
        clone: function() {
            return this.scalar(1);
        },

        /**
         * Compare the values of the 2 matrix
         */
        compare: function(matrix) {
            if (!(matrix instanceof Matrix)) {
                return false;
            }
            var i, j;

            if (this.col !== matrix.col ||
                this.row !== matrix.row) {
                return false;
            }

            for (i = 0; i < this.col; i++) {
                for (j = 0; j < this.row; j++) {
                    if (this.val[i][j] !== matrix.val[i][j]) {
                        return false;
                    }
                }
            }

            return true;
        },

        /**
         * Return the determinant of this matrix
         */
        det: function() {
            if (this.col !== this.row) {
                // determinant exists only square matrix
                return undefined;
            }

            var det = 1,
                clone = this.clone(),
                n = clone.col,
                i, j, k;

            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    if (i < j) {
                        var temp = clone.val[j][i] / clone.val[i][i];
                        for(k = 0; k < n; k++){
                            clone.val[j][k] -= clone.val[i][k] * temp;
                        }
                    }
                }
                det *= clone.val[i][i];
            }

            return det;
        },

        /**
         * Return a new matrix that is the inverse of this matrix
         */
        inv: function() {
            var det = this.det();
            if (det === undefined ||
                det === 0) {
                return undefined;
            }

            var clone = this.clone(),
                n = clone.col,
                i, j, k;

            // make identity matrix value
            var newVal = [];
            for (i = 0; i < n; i++) {
                newVal[i] = [];
                for (j = 0; j < n; j++) {
                    if (i === j) {
                        newVal[i][j] = 1;
                    } else {
                        newVal[i][j] = 0;
                    }
                }
            }

            // Gauss-Jordan method
            for (i = 0; i < n; i++) {
                var temp = 1 / clone.val[i][i];
                for (j = 0; j < n; j++) {
                    clone.val[i][j] *= temp;
                    newVal[i][j] *= temp;
                }
                for (j = 0; j < n; j++) {
                    if (i !==j) {
                        temp = clone.val[j][i];
                        for (k = 0; k < n; k++) {
                            clone.val[j][k] -= clone.val[i][k] * temp;
                            newVal[j][k] -= newVal[i][k] * temp;
                        }
                    }
                }
            }

            return new Matrix(newVal);
        },

        /**
         * Return a new matrix that is the transpose of this matrix
         */
        trans: function() {
            var newVal = [],
                i, j;
            for (i = 0; i < this.col; i++) {
                newVal[i] = [];
                for (j = 0; j < this.row; j++) {
                    newVal[i][j] = this.val[j][i];
                }
            }

            return new Matrix(newVal);
        }
    };

    if (typeof exports !== 'undefined') {
        exports.Matrix = Matrix;
    } else {
        window.Matrix = Matrix;
    }
})(window);