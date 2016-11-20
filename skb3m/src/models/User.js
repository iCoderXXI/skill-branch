import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
UserSchema.methods.toJSON = function() {
  return _.pick(this, ['name']);
}

export default mongoose.model('User', UserSchema);
