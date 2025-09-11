import Person from './person';
import * as fs from 'fs';
import * as path from 'path';

class PersonRepository {
    private persons: Person [] = [];

    loadPeople(): void {
        try {
            let content = fs.readFileSync(__dirname + '/data/people.json', 'utf-8');
            const list = JSON.parse(content);
            if (!Array.isArray(list)) throw new Error('Invalid Array');
            this.persons = list.map((data: any) => Person.fromJSON(data));
        } catch (err: any) {
            console.error(`Error loading people: ${err.message}`);
            this.persons = [];
        }
    }

    savePeople(): void {
        try {
            let list = this.persons.map(p => p.toJSON());
            fs.writeFileSync(__dirname + '/data/people.output.json', JSON.stringify(list, null, 2), 'utf-8');
        } catch (err: any) {
            console.error(`Saving file error: ${err.message}`);
        }
    }

    getAll(): Person[] {
        return this.persons;
    }
}

export default PersonRepository;