import { Schema, model, models } from 'mongoose';

const expenseSchema = Schema(
	{
		date: { type: Date, required: true },
		reason: { type: String, required: true },
		amount: { type: Number, required: true },
		payer: { type: String, required: true },
		participants: [{ type: String }],
	},
	{
		collection: 'expenses',
	}
);

export default models.expenses ? models.expenses : model('expenses', expenseSchema);
