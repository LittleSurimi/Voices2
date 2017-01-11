//https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md#understanding-scope

/*============================================
=            How the engine works            =
============================================
- Engine: responsible for start-to-finish compilation and execution of our JavaScript program.
- Compiler: one of Engine's friends; handles all the dirty work of parsing and code-generation (see previous section).
- Scope: another friend of Engine; collects and maintains a look-up list of all the declared identifiers (variables), and enforces a strict set of rules as to how these are accessible to currently executing code.

Encountering "var a" ---
Compiler asks Scope if variable a already exist for that particular scope collection
--> YES : ignore declaration
--> NO : variable "a" is declared in that scope collection

Then ---
Compiler produces code for Engine to later execute so that a = 2

But First ---
Engine runs Code to ask Scope if a variable called "a" is in the current scope collection
--> YES : Engine uses that variable
--> NO : Engine looks elsewhere (nested Scope for example, if nothing is found, Engine return an error)

/*=====  End of How the engine works  ======*/


function foo(a) {
  console.log(a);
}
var bar = new foo(2);
