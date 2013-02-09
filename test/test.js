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

test('add success', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.add(m2);
    equal(4, m3.getVal(0, 0));
    equal(6, m3.getVal(0, 1));
    equal(2, m3.getVal(1, 0));
    equal(8, m3.getVal(1, 1));
});

test('sub success', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.sub(m2);
    equal(-2, m3.getVal(0, 0));
    equal(-2, m3.getVal(0, 1));
    equal(4, m3.getVal(1, 0));
    equal(0, m3.getVal(1, 1));
});

test('scalar', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = m1.scalar(3);
    equal(3, m2.getVal(0, 0));
    equal(6, m2.getVal(0, 1));
    equal(9, m2.getVal(1, 0));
    equal(12, m2.getVal(1, 1));
});

test('mul success', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = new Matrix([[3, 4], [-1, 4]]);
    var m3 = m1.mul(m2);
    equal(1, m3.getVal(0, 0));
    equal(12, m3.getVal(0, 1));
    equal(5, m3.getVal(1, 0));
    equal(28, m3.getVal(1, 1));
});

test('compare', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(true, m1.compare(m1));

    var m2 = new Matrix([[1, 2], [3, 5]]);
    equal(false, m1.compare(m2));

    var m3 = new Matrix([[1, 2], [3, 4], [5, 6]]);
    equal(false, m1.compare(m3));
});

test('det success', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    equal(-2, m1.det());

    var m2 = new Matrix([[1, 8, 9], [-3, 2, 1], [4, 1, 5]]);
    // cancellation of significant digits occurs.
    equal(true, m2.det() - 62 < 0.001);
});

test('inv', function() {
    var m1 = new Matrix([[2, 1], [5, 3]]);
    var m2 = m1.inv();
    equal(3, m2.getVal(0, 0));
    equal(-1, m2.getVal(0, 1));
    equal(-5, m2.getVal(1, 0));
    equal(2, m2.getVal(1, 1));
});

test('trans', function() {
    var m1 = new Matrix([[1, 2], [3, 4]]);
    var m2 = m1.trans();
    equal(1, m2.getVal(0, 0));
    equal(3, m2.getVal(0, 1));
    equal(2, m2.getVal(1, 0));
    equal(4, m2.getVal(1, 1));
});