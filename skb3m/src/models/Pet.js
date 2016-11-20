import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const PetSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['cat', 'dog'],
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});
PetSchema.methods.toJSON = function() {
  return _.pick(this, ['name', 'type', 'owner']);
}

// PetSchema.methods.toObject = function() {
//   return {
//     name: 'prefix_' + this.name,
//   }
// }

export default mongoose.model('Pet', PetSchema);
