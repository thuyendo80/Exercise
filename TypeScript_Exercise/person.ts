export class Person {
    private name: string;
    private age: number;
    private city: string;
    
    constructor(name:string,age:number,city:string){
        if (name.length===0){
            console.log("Name should not be empty");
        }
        if (age<0){
            console.log("Age should be positive");
        }
        this.name=name;
        this.age=age;
        this.city=city;
        
    }

    get greet(): string {
        return "Hi, I'm " + this.name + " from " + this.city;
    }

    celebrateBirthday(): void{
        this.age=this.age+1;
        console.log(this.age);
    }

    updateCity(newCity: string):void {
        this.city=newCity;
    }

    isAdult():boolean {
        return this.age>=18;
    }

    hasSameCity(other: Person):boolean {
        return this.city===other.city;
    }

    //getter for name
    get getName(): string {
        return this.name;
    }

    //getter for age
    get getAge(): number {
        return this.age;
    }

    //getter for name
    get getCity(): string {
        return this.city;
    }

    toJSON() {
        return{
            personName: this.name,
            personAge: this.age,
            personCity: this.city
        }
    }

    static fromJSON(json: any): Person {
        //const data = JSON.parse(json);
        return new Person(json.name,json.age,json.city);
    }
}

export default Person;