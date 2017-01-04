//
// Immediately Invoked Function Expressions
//
//https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch2.md#immediately-invoked-function-expressions-iifes

// In a file named a.js
var A = (function(){
    var PI = 3.14159;
    var e = 3;

    function printA (){
        console.log('a', a);
    }

    var pub = {
        e: e
        printA: printA
    }
    return pub;
})();

// In another file named b.js
const a = new A();
a.e // 3
a.printA() // print 1
a.a // you can't

// console
a.e // 1

