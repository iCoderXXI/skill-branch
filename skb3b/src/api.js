import express from 'express';
import cors from 'cors';
import _ from 'lodash';

export default (data) => {

  const app = express();
  app.use(cors());

  function notFound(res) {
    return res.status(404).send("Not Found");
  }

  function sendPetsByUserId(id, res) {
    if (id) {
      const pets = data.pets.slice()
        .filter(item => item.userId == id);
      if (pets.length>0) {
        return res.json(pets);
      }
    }
    notFound(res);

  }

  function populateUsers(users, req) {
    let pets = data.pets.slice();
    let myUsers = users.slice();

    //console.log(users);

    const q = req.query;
    if (q.havePet) {
      let petsFiltered = pets.filter( pet => pet.type === q.havePet);
      const usersWithPetsIDs = petsFiltered
        .filter(pet => pet.type === q.havePet)
        .map(pet => pet.userId);
      myUsers = myUsers.filter(user => _.indexOf(usersWithPetsIDs, user.id)!==-1);
    }

    myUsers = myUsers.map( user => ({
      ...user,
      pets: pets.filter( pet => pet.userId === user.id )
    }));

    return myUsers;
  }

  app.get('/', (req, res) => {
    res.json(data);
  });


  app.get('/users', (req, res) => {
    // / || /?havePet=cat
    const q = req.query;
    let users = data.users.slice();

    if (q.havePet) {
      const usersWithPetsIDs = data.pets.slice()
        .filter(pet => pet.type === q.havePet)
        .map(pet => pet.userId);
      users = users.filter(user => _.indexOf(usersWithPetsIDs, user.id)!==-1);
    }
    return res.json(users);
  });


  app.get('/users/populate', (req, res) => {
    let users = data.users.slice();
    console.log(users);
    return res.json(populateUsers(users, req));
  });


  app.get('/users/:id', (req, res) => {
    const p = req.params;
    const re = /[\d]+/;

    if (p.id) {
      let users = data.users.slice();
      if (re.test(p.id)) {
          users = users.filter(item => item.id == p.id);
        if (users.length > 0) {
          return res.json(users[0]);
        }
      } else {
          users = users.filter(item => item.username == p.id);
        if (users.length>0) {
          return res.json(users[0]);
        }
      }
    }
    return res.status(404).send("Not Found");
  });


  app.get('/users/:id/populate', (req, res) => {
    const p = req.params;
    const re = /[\d]+/;
    console.log('Yo!', p);

    if (p.id) {
      let users = data.users.slice();
      if (re.test(p.id)) {
          users = users.filter(item => item.id == p.id);
          console.log('id', users);
        if (users.length>0) {
          return res.json(populateUsers(users, req)[0]);
        }
      } else {
          users = users.filter(item => item.username == p.id);
          console.log('username', users);
        if (users.length>0) {
          return res.json(populateUsers(users, req)[0]);
        }
      }
    }
    return res.status(404).send("Not Found");
  });


  app.get('/users/:id/pets', (req, res) => {
    const p = req.params;

    console.log(p);
    if (p.id) {
      if (Number.isInteger(p.id)) {
        return sendPetsByUserId(p.id, res)
      } else {
        const users = data.users.slice()
          .filter(user => user.username == p.id);
        if (users.length>0) {
          const id = users[0].id;

          return sendPetsByUserId(id, res);
        }
      }
    }
    return notFound(res);
  });


  app.get('/pets', (req, res) => {
    // / || /?type=cat || ?age_gt=12 || age_lt=25
    const q = req.query;
    let pets = data.pets.slice();
    if (q.type) {
      pets = pets.filter(item => item.type === q.type);
    }
    if (q.age_gt) {
      pets = pets.filter(item => item.age > q.age_gt);
    }
    if (q.age_lt) {
      pets = pets.filter(item => item.age < q.age_lt);
    }
    return res.json(pets);

  });

  app.get('/pets/populate', (req, res) => {
    let pets = data.pets.slice();
    let users = data.users.slice();
    const q = req.query;
    if (q.type) { pets = pets.filter( pet => pet.type === q.type); }
    if (q.age_gt) { pets = pets.filter( pet => pet.age > q.age_gt); }
    if (q.age_lt) { pets = pets.filter( pet => pet.age < q.age_lt); }

    let myPets = pets.map( pet => ({
      ...pet,
      user: users.filter( user => pet.userId === user.id )[0]
    }));
    return res.json(myPets);
  });

  app.get('/pets/:id', (req, res) => {
    const p = req.params;
    let pets = data.pets.slice().filter(pet => pet.id == p.id);
    console.log(p.id, pets);
    if (pets.length > 0) {
      return res.json(pets[0]);
    }
    return notFound(res);
  });

  app.get('/pets/:id/populate', (req, res) => {
    const p = req.params;
    const pets = data.pets.slice();
    let pet = { ...pets.filter(pet => pet.id == p.id)[0]};
    const users = data.users.slice();
    if (pet) {
      const petUser = users.filter( user => pet.userId === user.id )[0];
      console.log(petUser);
      if (petUser) {
        pet.user = petUser;
        console.log(pet);
      }
      return res.json(pet);
    }
    return notFound(res);
  });


  app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
  });

  return app;
}
