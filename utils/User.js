import { Schema, model, models } from 'mongoose';

const userSchema = Schema(
	{
		name: { type: String, required: true, unique: true },
		hash: { type: String, required: true },
	},
	{
		collection: 'users',
	}
);

export default models.users ? models.users : model('users', userSchema);
