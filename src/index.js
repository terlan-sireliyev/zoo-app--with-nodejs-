import express from "express"; //№1
import port from "../utils/port.js";
import { readFile } from "fs/promises";
const app = express();
let animals = JSON.parse((await readFile(process.env.ANIMALS_DATA)).toString());
app.use(express.json());
//---GET--ALL---here we get all the data
app.get("/animal", (req, res) => {
  res.json(animals);
});
//---GET---here we get it by its id
app.get("/animal/:id", (req, res) => {
  const { id } = req.params;
  let animal;
  if (id) {
    animal = animals.find((item) => item.id === id);
    res.send(animal);
  }
});
//---GET---here we get it by its type
app.get("/animal/type/:type", (req, res) => {
  const { type } = req.params;
  const filteredAnimals = animals.filter((animal) => animal.type === type);
  if (filteredAnimals.length > 0) {
    res.send(filteredAnimals);
  } else {
    res.status(404).send("Animals of this type not found");
  }
});
//How many pieces of this type are there?
app.get("/animal/count/:type", (req, res) => {
  const { type } = req.params;
  const numberOfAnimals = animals.filter((animal) => animal.type === type);
  res.send({ count: numberOfAnimals.length });
});
//here is the average number of ages of the types
app.get("/animal/age/:type", (req, res) => {
  const { type } = req.params;
  const filteredAnimals = animals.filter((animal) => animal.type === type);
  const totalAnimals = filteredAnimals.length;
  const sumOfAges = filteredAnimals.reduce((acc, animal) => {
    return acc + animal.age;
  }, 0);
  const averageAge = totalAnimals > 0 ? sumOfAges / totalAnimals : 0;
  res.send({ averageAge });
});
//here we add a new animal
app.post("/animal", (req, res) => {
  animals.push(req.body);
  res.send("success posted");
});

//---PUT---here we change the animal according to its id
app.put("/animal/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  animals = animals.map((item) => {
    if (item.id === id) {
      return req.body;
    }
    return item;
  });
  res.status(200).send({ message: "animal is updated", id });
});
//---PUT---here we change the animal according to its age
app.put("/animal/hbd/:id", (req, res) => {
  const { id } = req.params;
  const { age } = req.body;
  animals = animals.map((item) => {
    if (item.id === id) {
      if (age !== undefined) {
        item.age += age;
      }
    }
    return item;
  });

  res.status(200).send({ message: "Animal is hbd updated", id });
});
//---delete---here we delete the animal by its id
app.delete("/animal/:id", (req, res) => {
  const { id } = req.params;
  animals = animals.filter((item) => item.id !== id);
  res.send("deleted post");
});

//---delete---here we delete the animal by its type
app.delete("/animal/type/:type", (req, res) => {
  const { type } = req.params;
  animals = animals.filter((item) => item.type !== type);
  res.send("Deleted animals of specified type");
});

app.listen(port, () => {
  console.log("Server is running");
});
