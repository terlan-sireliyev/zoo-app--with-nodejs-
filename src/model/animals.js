import { v4 } from "uuid";

class Animal {
  constructor(name, type, age, gender) {
    this.id = v4();
    this.name = name;
    this.type = type;
    this.age = age;
    this.gender = gender;
  }
}

export default Animal;
