(function(window) {
    var Matrix = function(array) {
        this.col = array.length;
        this.row = array[0].length;

        this.val = [];

        var i, j;
        for (i = 0; i < this.col; i++) {
            this.val[i] = [];
            for (j = 0; j < this.row; j++) {
                this.val[i][j] = array[i][j];
            }
        }
    };
    
    Matrix.prototype = {
        
        getRowSize: function() {
            return this.row;
        },

        getColSize: function() {
            return this.col;
        },

        getVal: function(col, row) {
            return this.val[col][row];
        },
        

        add: function(matrix) {
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

        sub: function(matrix) {
            return this.add(matrix.scalar(-1));
        },

        scalar: function(n) {
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

        mul: function(matrix) {
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

        clone: function() {
            return this.scalar(1);
        },

        compare: function(matrix) {
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

        det: function() {
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

        inv: function() {
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