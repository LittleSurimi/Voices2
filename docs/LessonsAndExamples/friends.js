class Human {
    constructor(firstname, attribute, beerDebt, avaibility, isGameBeginnner){
        this.firstname = firstname;
        if(avaibility){
          this.avaibility = true;
        }
        if(beerDebt){
          this.beerDebt = true;
        }
        this.friend = null;
        this.activity = null;
        this.attribute = attribute;
        this.isGameBeginnner =  false;
    }

    makeFriend(human) {
        this.friend = human;
    }

    askOut() {
        if (this.beerDebt && this.avaibility) {
            console.log(`${this.firstname} said : Are you free tonight ?`);
        } else {
            console.log(`${this.firstname} think : Wait for the call of that ${this.friend.attribute}`);
        }
    }

    do(game){
        this.activity = game;
    }

    playAGame(require){
        if(require === true){
            console.log(`Awesome let's play ${this.name}`);
        } else {
            console.log(`Too bad let's play ${this.name} another day`);
        }
    }

}

class Game {
    constructor(isDifficult,requireSomething){
        if (isDifficult){
            this.isDifficult = true;
        }
        if (requireSomething){
            this.requireSomething = true;
        }
    }
    playThisGame(require){

    }
}



const mark = new Human("Mark", "funny guy", null, null);
const solene = new Human("Solene", "cheeky girl", true, true);

const kite = new Game("", "wind");

mark.makeFriend(solene);
solene.makeFriend(mark);

mark.askOut();
solene.askOut();

solene.do(kite);
