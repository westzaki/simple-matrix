test('constructor', function() {
    var m1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
    equal(2, m1.col);
    equal(3, m1.row);
    equal(1, m1.val[0][0]);
    equal(2, m1.val[0][1]);
    equal(3, m1.val[0][2]);
    equal(4, m1.val[1][0]);
    equal(5, m1.val[1][1]);
    equal(6, m1.val[1][2]);
});

test('constructor argument check', function() {
    throws(function() {
        new Matrix(3);
    }, Error);
    throws(function() {
        new Matrix('string');
    }, Error);
    throws(function() {
        new Matrix([1]);
    }, Error);
    throws(function() {
        new Matrix([[1, 2], [1, 2, 3]]);
    }, Error);
    throws(function() {
        new Matrix([[]]);
    }, Error);
});

test('getColSize', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(2, m1.getColSize());

    var m2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
    equal(2, m2.getColSize());

    var m3 = new Matrix([[1], [2], [3]]);
    equal(3, m3.getColSize());
});

test('getRowSize', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(2, m1.getRowSize());

    var m2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
    equal(3, m2.getRowSize());

    var m3 = new Matrix([[1], [2], [3]]);
    equal(1, m3.getRowSize());
});

test('getVal', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(1, m1.getVal(0, 0));
    equal(2, m1.getVal(0, 1));
    equal(3, m1.getVal(1, 0));
    equal(4, m1.getVal(1, 1));
});

test('getVal argument check', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    throws(function() {
        m1.getVal(1);
    }, Error);
    throws(function() {
        m1.getVal(-1, 3);
    }, Error);
    throws(function() {
        m1.getVal(2, -1);
    }, Error);
    throws(function() {
        m1.getVal(3, 1);
    }, Error);
    throws(function() {
        m1.getVal(1, 3);
    }, Error);
});

test('add', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.add(m2);
    equal(4, m3.getVal(0, 0));
    equal(6, m3.getVal(0, 1));
    equal(2, m3.getVal(1, 0));
    equal(8, m3.getVal(1, 1));
});

test('add argument check', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    throws(function() {
        m1.add(1);
    }, Error);
    throws(function() {
        m1.add(new Matrix([1, 2, 3], [4, 5, 6]));
    }, Error);
});

test('sub', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.sub(m2);
    equal(-2, m3.getVal(0, 0));
    equal(-2, m3.getVal(0, 1));
    equal(4, m3.getVal(1, 0));
    equal(0, m3.getVal(1, 1));
});

test('sub argument check', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    throws(function() {
        m1.sub(1);
    }, Error);
    throws(function() {
        m1.sub(new Matrix([1, 2, 3], [4, 5, 6]));
    }, Error);
});

test('scalar', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = m1.scalar(3);
    equal(3, m2.getVal(0, 0));
    equal(6, m2.getVal(0, 1));
    equal(9, m2.getVal(1, 0));
    equal(12, m2.getVal(1, 1));
});

test('scalar argument check', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    throws(function() {
        m1.sub('string');
    }, Error);
});

test('mul', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.mul(m2);
    equal(1, m3.getVal(0, 0));
    equal(12, m3.getVal(0, 1));
    equal(5, m3.getVal(1, 0));
    equal(28, m3.getVal(1, 1));

    var m4 = new Matrix([[1, 1, 1], [1, 1, 1]]);
    var m5 = new Matrix([[1, 1], [1, 1], [1, 1]]);
    var m6 = m4.mul(m5);
    equal(3, m6.getVal(0, 0));
    equal(3, m6.getVal(0, 1));
    equal(3, m6.getVal(1, 0));
    equal(3, m6.getVal(1, 1));
});

test('mul argument check', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    throws(function() {
        m1.mul('string');
    }, Error);
    throws(function() {
        m1.mul(1);
    }, Error);

    var m2 = new Matrix([[1, 2], [3, 4], [5, 6]]);
    throws(function() {
        m1.mul(m2);
    }, Error);
});

test('clone', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = m1.clone();
    equal(1, m1.getVal(0, 0));
    equal(2, m1.getVal(0, 1));
    equal(3, m1.getVal(1, 0));
    equal(4, m1.getVal(1, 1));
});

test('compare', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(true, m1.compare(m1));

    var m2 = new Matrix([[1, 2], [3, 5]]);
    equal(false, m1.compare(m2));

    var m3 = new Matrix([[1, 2], [3, 4], [5, 6]]);
    equal(false, m1.compare(m3));
    equal(false, m1.compare(3));
});

test('det', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(-2, m1.det());

    var m2 = new Matrix([[1, 8, 9], [-3, 2, 1], [4, 1, 5]]);
    // cancellation of significant digits occurs.
    equal(true, m2.det() - 62 < 0.001);

    var m3 = new Matrix([[1, 8, 9], [-3, 2, 1]]);
    equal(undefined, m3.det());
});

test('inv', function() {
    var m1 = new Matrix([[2, 1], [5, 3]]);
    var m2 = m1.inv();
    equal(3, m2.getVal(0, 0));
    equal(-1, m2.getVal(0, 1));
    equal(-5, m2.getVal(1, 0));
    equal(2, m2.getVal(1, 1));

    var m3 = new Matrix([[1, 1], [1, 1]]);
    equal(undefined, m3.inv());
    var m4 = new Matrix([[1, 8, 9], [-3, 2, 1]]);
    equal(undefined, m4.inv());
});

test('trans', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = m1.trans();
    equal(1, m2.getVal(0, 0));
    equal(3, m2.getVal(0, 1));
    equal(2, m2.getVal(1, 0));
    equal(4, m2.getVal(1, 1));
});