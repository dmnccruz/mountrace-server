const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  createdAt: String,
  responded: { type: Boolean, default: false },
  condition: { type: String, default: 'normal' },
  role: { type: String, default: 'user' }
});

module.exports = model('User', userSchema);
