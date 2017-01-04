class A {
    constructor(){
        this.x = 1; // in a constructor this refer to the parent Class
    }

    funcB () {
        function c () {
            this.x = 2;
            // Within a function This refers the the function itself
            // 2
        }
        c(); // return c

        console.log(this.x) // 1
    }

    funcE (){
        const that = this;
        const f = ()=> { this.x = 3 }
        f();
    }
}

const a = new A();
console.log(a.x) // 1

a.funcB();
console.log(a.x) // 1

a.funcE();
console.log(a.x) // 3
