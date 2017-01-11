class Human {
    constructor(firstname, crushName, attribute, beerDebt, avaibility ) {
        this.firstname = firstname;
        if(avaibility){
          this.avaibility = true;
        }
        if(beerDebt){
          this.beerDebt = true;
        }
        this.crushName = crushName;
    }
    get crush() {
      return this.crushAttribute();
    }

    crushAttribute() {
      Human(this.crushName);
    }

    ask() {
        if (this.beerDebt && this.avaibility) {
            console.log(this.firstname + " said : Are you free tonight ?");
        } else {
            console.log(this.firstname + " think : Wait for the call of that " + this.crushName['attribute']);
        }
    }

}

const Mark = new Human("Mark", "Solene", "tall blond blue eye kiwi guy");

const Solene = new Human("Solene", "Mark", "cheeky french girl", true, true);

Mark.ask();
Solene.ask();

