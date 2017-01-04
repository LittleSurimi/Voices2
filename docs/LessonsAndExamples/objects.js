class Vehicle {

    constructor(){
        this.speed = 0;
    }

    move (spd){
        this.speed = spd;
    }
}

class Car extends Vehicle {
    move() { // override
        this.speed = 2;
    }
}

class AirPlane extends Vehicle {
    fly() {
        this.move(3);
    }
}

const v = new Vehicle();
console.log(c.speed) // 0
v.move(1);
console.log(v.speed); // 1

const c = new Car();
console.log(c.speed) // 0
c.move();
console.log(c.speed); // 2

const a = new AirPlane();
console.log(a.speed) // 0
a.fly();
console.log(c.speed); // 3

class Human {
    constructor(weight, energy, think, vehicle){
        this.speed = 0;
        this.weight = weight;
        this.energy = energy;
        this.think = think;
        this.isSlept = false;
        if(vehicle){
            this.vehicle = vehicle;
        }
    }
    run(spd){
        this.speed = spd;
    }
    lossWeight(){
        this.weight = this.weight - 1;
    }
    sleep(){
        console.log('hello', this.hello);
        if (this.think > 0){
            console.log('not sleep yet', this.think);
            this.think = this.think - 1;
        } else {
            console.log('now sleeping');
            this.isSlept = true;
        }
    }
    coma(){

        this.hello = false;
        if (this.isSlept === false && this.think > 0){
            console.log('not sleep yet', this.think);
            this.think = this.think / 2;
            this.isSlept = true;
            console.log('coma', this.think);
        }
    }
}

const liqiu = new Human(20, 3, 60, new Car());
liqiu.run(1);

const solen = new Human(10, 3);
solen.run(2);
