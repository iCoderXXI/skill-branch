import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import isAdmin from './middlewares/isAdmin';
import Pet from './models/Pet';
import User from './models/User';
import saveDataToDB from './saveDataToDB';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/iCoderXXI_skb3m');

const app = express();
app.use(cors());
app.use(bodyParser.json())
//app.use(isAdmin);

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});
app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});


app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});
  return res.json('All users && pets have been removed.');
});
app.post('/data', isAdmin, async (req, res) => {
  const data = req.body;
  if (!data.user) return res.status(400).json('User required');
  if (!data.pets) data.pets = [];

  const user = await User.findOne({
    name: data.user.name,
  });
  if (user) return res.status(400).json(`User ${user.name} already exists.`);

  try {
    const result = await saveDataToDB(data);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }

});


app.listen(3000, () => {
  console.log('Your app is listening on port 3000.');
})
