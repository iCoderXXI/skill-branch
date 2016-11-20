import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import Pet from './models/Pet';
import User from './models/User';
import saveDataToDB from './saveDataToDB';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/iCoderXXI_skb3m');

const app = express();
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});
app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});
app.post('/data', (req, res) => {

  const data = req.body;
  // const data = {
  //   user: {
  //     name: 'iCoder.XXI',
  //   },
  //   pets: [
  //     {
  //       name: 'Yosia',
  //       type: 'dog',
  //     },
  //     {
  //       name: 'Pusia',
  //       type: 'cat',
  //     }
  //   ],
  // };
  saveDataToDB(data);

});


app.listen(3000, () => {
  console.log('Your app is listening on port 3000.');
})
