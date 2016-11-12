class Animal {
  fullName: string;

  type: string;

  constructor(fullName: string, type: string) {
    this.fullName = fullName;

    this.type = type;
  }
}

function getAnimalParams(animal: Animal) {
  console.log('animal name: ' + animal.fullName + 'animal type: ' + animal.type);
}

var parrot = new Animal('Cucumber', 'not-alone-parrot');
