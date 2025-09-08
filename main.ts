import PersonRepository from "./personRepository";

const repo = new PersonRepository();
repo.loadPeople();

repo.getAll().forEach(person => {
    person.celebrateBirthday();
    console.log(person.greet);
    console.log(`Is Adult: ${person.isAdult()}`);
});

repo.savePeople();