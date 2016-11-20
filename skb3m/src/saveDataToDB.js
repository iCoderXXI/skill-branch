import Pet from './models/Pet';
import User from './models/User';

export default async function saveDataToDB(data) {
  try {
    const user = new User(data.user);
    await user.save();
    console.log('User saved');
    const promises = data.pets.map((pet) => {
      const petData = Object.assign({}, pet, {
        owner: user._id,
      });
      return (new Pet(petData)).save();
    });
    console.log('User\'s pets saved');
    return {
      user,
      pets: await Promise.all(promises),
    }
  } catch(err) {
    console.log('Error: ',err);
    throw err;
  }
}
