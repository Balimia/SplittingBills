import mongoose from './mongoose';

const f = async () => {
	await mongoose.init();
};
