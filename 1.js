//1

function getRecursiveFibonachchi(number) {
    if (typeof number !== 'number') {
        throw new TypeError("It is not a number");
    }
    if (number === 1 || number === 2) {
        return 1;
    }
    return getRecursiveFibonachchi(number - 1) + getRecursiveFibonachchi(number - 2);
}

function cachingDecorator(someFunction) {
    if (typeof someFunction !== 'function') {
        throw new TypeError("It is not a function");
    }
    let cache = [];
    return function(functionArguments) {
        if (functionArguments in cache) {
            return cache[functionArguments];
        }
        let result = someFunction.call(this, functionArguments);
        cache[functionArguments] = result;
        return result;
    };
}

let getMemoizedFibonachchi = cachingDecorator(getRecursiveFibonachchi);

function* iterableFibonachchi() {
    let previous = 1;
    let current = 1;
    yield previous;
    yield current;
    while (true) {
        let temporary = current;
        current += previous;
        previous = temporary;
        yield current;
    }
}

let fibonachchiRange = {
    first: 1,
    [Symbol.iterator]: function() {
        return {
            previous: this.first,
            current: 1,
            next() {
                if (true) {
                    let result = this.previous;
                    let temporary = this.current;
                    this.current += this.previous;
                    this.previous = temporary;
                    return { done: false, value: result };
                }
            },
        };
    },
};

//2
/*
function isPalindrome(str) {
    if (typeof str !== 'string') {
        throw new TypeError("It is not a string");
    }
    let wordsArray = str.split('-');
    let wordsSet = new Set();
    for (let word of wordsArray) {
        word = word.toLowerCase().split("").sort().join("");
        wordsSet.add(word);
    }
    return wordsSet.size === 1;
}*/

function isPalindrome(str) {
    if (typeof str !== 'string') {
        throw new TypeError("It is not a string");
    }
    let wordsArray = [];
    let i = 0;
    for (let element of str) {
        element = element.toLowerCase();
        if (element !== '-') {
            if (wordsArray[i] === undefined) {
                wordsArray[i] = [];
                wordsArray[i].push(element);
            } else { wordsArray[i].push(element); }
        } else {
            i++;
        }
    }
    if (wordsArray[0].length !== wordsArray[1].length) {
        return false;
    }
    for (let i = 0; i < wordsArray[0].length; i++) {
        if (!wordsArray[1].includes(wordsArray[0][i])) {
            return false;
        }
        wordsArray[1].splice(wordsArray[1].indexOf(wordsArray[0][i]), 1);
    }
    return true;
}

//3
class TriangleError extends Error {
    constructor(message) {
        super(message);
        this.name = TriangleError;
    }
}

function isTriangle(first, second, third) {
    return first + second > third && first + third > second && second + third > first;
}

function findTrianglePerimeter(firstSide, secondSide, thirdSide) {
    if (!isTriangle(firstSide, secondSide, thirdSide)) {
        throw new TriangleError("It is impossible to build a triangle with sides with this values");
    }
    return firstSide + secondSide + thirdSide;
}

function findTriangleSquare(firstSide, secondSide, thirdSide) {
    if (!isTriangle(firstSide, secondSide, thirdSide)) {
        throw new TriangleError("It is impossible to build a triangle with sides with this values");
    }
    let halfOfPerimeter = (firstSide + secondSide + thirdSide) / 2;
    return Math.sqrt(halfOfPerimeter * (halfOfPerimeter - firstSide) * (halfOfPerimeter - secondSide) * (halfOfPerimeter - thirdSide));
}

class Triangle {
    constructor(first, second, third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }
    isTriangle() {
        return this.first + this.second > this.third && this.first + this.third > this.second && this.second + this.third > this.first;
    }
    findPerimeter() {
        if (!isTriangle()) {
            return null;
        }
        return thus.first + this.second + this.third;
    }
    findSquare() {
        if (!isTriangle()) {
            return null;
        }
        let halfOfPerimeter = (this.first + this.second + this.third) / 2;
        return Math.sqrt(halfOfPerimeter * (halfOfPerimeter - this.first) * (halfOfPerimeter - this.second) * (halfOfPerimeter - this.third));
    }
}

function findRectanglePerimeter(firstSide, secondSide) {
    return (firstSide + secondSide) * 2;
}

function findRectangleSquare(firstSide, secondSide) {
    return firstSide * secondSide;
}

class Rectangle {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    findPerimeter() {
        return (this.first + this.second) * 2;
    }
    findSquare() {
        return this.first * this.second;
    }
}

function findCirclePerimeter(radius) {
    return 2 * Math.PI * radius;
}

function findCircleSquare(radius) {
    return Math.PI * radius * radius;
}

class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    findPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    findSquare() {
        return Math.PI * this.radius * this.radius;
    }
}

//4

function findSomeElement(numbers, callback) {
    if (numbers.length === 0) {
        return 0;
    }
    let selectedElement = numbers[0];
    for (let element of numbers) {
        if (callback(element, selectedElement)) {
            selectedElement = element;
        }
    }
    return selectedElement;
}

/*
function findMinElement(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let minElement = numbers[0];
    for (let element of numbers) {
        if (element < minElement) {
            minElement = element;
        }
    }
    return minElement;
}

function findMaxElement(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let maxElement = numbers[0];
    for (let element of numbers) {
        if (element > maxElement) {
            maxElement = element;
        }
    }
    return maxElement;
}
*/

function findRecursiveMinElement(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return numbers[0];
    }
    return Math.min(numbers[numbers.length - 1], findRecursiveMinElement(numbers.slice(0, numbers.length - 1)));
}

function findRecursiveMaxElement(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return numbers[0];
    }
    return Math.max(numbers[numbers.length - 1], findRecursiveMaxElement(numbers.slice(0, numbers.length - 1)));
}

function countSomeElements(numbers, callback) {
    if (numbers.length === 0) {
        return 0;
    }
    let counter = 0;
    for (let element of numbers) {
        if (callback(element)) {
            counter++;
        }
    }
    return counter;
}

function countRecursiveSomeElements(numbers, callback) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return +(callback(numbers[0]));
    }
    return +(callback(numbers[0])) + countRecursiveSomeElements(numbers.slice(1));
}

/*
function countZeroElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let counter = 0;
    for (let element of numbers) {
        if (element === 0) {
            counter++;
        }
    }
    return counter;
}

function countRecursiveZeroElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return +(numbers[0] == 0);
    }
    return +(numbers[0] === 0) + countRecursiveZeroElements(numbers.slice(1));
}

function countPositiveElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let counter = 0;
    for (let element of numbers) {
        if (element > 0) {
            counter++;
        }
    }
    return counter;
}

function countRecursivePositiveElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return +(numbers[0] > 0);
    }
    return +(numbers[0] > 0) + countRecursivePositiveElements(numbers.slice(1));
}

function countNegativeElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let counter = 0;
    for (let element of numbers) {
        if (element < 0) {
            counter++;
        }
    }
    return counter;
}

function countRecursiveNegativeElements(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    if (numbers.length === 1) {
        return +(numbers[0] < 0);
    }
    return +(numbers[0] < 0) + countRecursiveNegativeElements(numbers.slice(1));
}
*/

//5

function convertToBinary(number) {
    let resultNumber = "";
    while (number !== 0) {
        resultNumber += number % 2;
        number = Math.floor(number / 2);
    }
    return +resultNumber.split('').reverse().join('');
}

function convertToDecimal(number) {
    let binaryArray = number.toString().split('').reverse();
    let resultNumber = 0;
    for (let i = 0; i < binaryArray.length; i++) {
        resultNumber += binaryArray[i] * Math.pow(2, i);
    }
    return resultNumber;
}

//6

function getFactorial(number) {
    if (number === 1) {
        return number;
    }
    return number * getFactorial(number - 1);
}

let getMemoizedFactorial = cachingDecorator(getFactorial);

//7

class MatrixSizeError extends Error {
    constructor(message) {
        super(message);
        this.name = "MatrixSizeError";
    }
}

function findSizeOfMatrix(matrix) {
    for (let i = 0; i < matrix.length - 1; i++) {
        if (matrix[i].length !== matrix[i + 1].length) {
            return null;
        }
    }
    return {
        length: matrix.length,
        width: matrix[0].length
    };
}

function addTwoMatrixes(firstMatrix, secondMatrix) {
    let sizeOfFirstMatrix = findSizeOfMatrix(firstMatrix);
    let sizeOfSecondMatrix = findSizeOfMatrix(secondMatrix);
    if (!sizeOfFirstMatrix || !sizeOfSecondMatrix) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    if (sizeOfFirstMatrix.length !== sizeOfSecondMatrix.length || sizeOfFirstMatrix.width !== sizeOfSecondMatrix.width) {
        return new MatrixSizeError("Matrixes must have the same size to add them");
    }
    let length = sizeOfFirstMatrix.length;
    let width = sizeOfFirstMatrix.width;
    let resultMatrix = [];
    for (let i = 0; i < length; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(firstMatrix[i][j] + secondMatrix[i][j]);
        }
        resultMatrix.push(row);
    }
    return resultMatrix;
}

function transposeMatrix(matrix) {
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    let resultMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let column = [];
        for (let j = 0; j < width; j++) {
            column.push(matrix[j][i]);
        }
        resultMatrix.push(column);
    }
    return resultMatrix;
}

//8

function calculateSmthAboveMainDiagonal(matrix, callback) {
    let finalValue = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    let elementsAboveMainDiagonal = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < width; j++) {
            elementsAboveMainDiagonal.push(matrix[i][j]);
        }
    }
    finalValue = elementsAboveMainDiagonal.customReduce(callback);
    return finalValue;
}

function calculateSmthBelowMainDiagonal(matrix, callback) {
    let finalValue = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    let elementsBelowMainDiagonal = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            elementsBelowMainDiagonal.push(matrix[i][j]);
        }
    }
    finalValue = elementsBelowMainDiagonal.customReduce(callback);
    return finalValue;
}

/*
function calculateSumOfElementsAboveMainDiagonal(matrix) {
    let sumOfElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < width; j++) {
            sumOfElements += matrix[i][j];
        }
    }
    return sumOfElements;
}

function calculateSumOfElementsBelowMainDiagonal(matrix) {
    let sumOfElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            sumOfElements += matrix[i][j];
        }
    }
    return sumOfElements;
}

function calculateZeroElementsAboveMainDiagonal(matrix) {
    let zeroElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < width; j++) {
            zeroElements += matrix[i][j] === 0;
        }
    }
    return zeroElements;
}

function calculateZeroElementsBelowMainDiagonal(matrix) {
    let zeroElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            zeroElements += matrix[i][j] === 0;
        }
    }
    return zeroElements;
}

function calculateAverageValueAboveMainDiagonal(matrix) {
    let sumOfElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    let numberOfElements = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < width; j++) {
            sumOfElements += matrix[i][j];
            numberOfElements++;
        }
    }
    return sumOfElements / numberOfElements;
}

function calculateAverageValueBelowMainDiagonal(matrix) {
    let sumOfElements = 0;
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let width = findSizeOfMatrix(matrix).width;
    let numberOfElements = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            sumOfElements += matrix[i][j];
            numberOfElements++;
        }
    }
    return sumOfElements / numberOfElements;
}
*/

//9

function deleteRowsWithZeroElements(matrix) {
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    for (let row of matrix) {
        if (row.includes(0)) {
            matrix.splice(matrix.indexOf(row), 1);
        }
    }
    return matrix;
}

function deleteColumnsWithZeroElements(matrix) {
    if (!findSizeOfMatrix(matrix)) {
        throw new MatrixSizeError("Matrix must have the same size for each row!");
    }
    let indexesOfColumnsWithZeroes = new Set();
    for (let row of matrix) {
        if (row.includes(0)) {
            indexesOfColumnsWithZeroes.add(row.indexOf(0));
        }
    }
    for (let index of indexesOfColumnsWithZeroes) {
        for (let row of matrix) {
            row.splice(index, 1);
        }
    }
    return matrix;
}

//10 

Function.prototype.customBind = function(context, ...args) {
    let funcSymbol = Symbol();
    context[funcSymbol] = this;
    return function(...args2) {
        let result = context[funcSymbol](...args, ...args2);
        delete context[funcSymbol];
        return result;
    }
};

Function.prototype.customCall = function(context, ...args) {
    let funcSymbol = Symbol();
    context[funcSymbol] = this;
    let result = context[funcSymbol](...args);
    context[funcSymbol] = null;
    return result;
};

Array.prototype.customMap = function(callback) {
    if (typeof callback !== "function") {
        throw new TypeError("It is not a function");
    }
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

Array.prototype.customFilter = function(callback) {
    if (typeof callback !== "function") {
        throw new TypeError("It is not a function");
    }
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

Array.prototype.customForEach = function(callback) {
    if (typeof callback !== "function") {
        throw new TypeError("It is not a function");
    }
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

Array.prototype.customReduce = function(callback, initial) {
    if (typeof callback !== "function") {
        throw new TypeError("It is not a function");
    }
    let i = 0;
    if (arguments.length < 2) {
        initial = this[0];
        i = 1;
    }
    while (i < this.length) {
        initial = callback(initial, this[i], i, this);
        i++;
    }
    return initial;
};
