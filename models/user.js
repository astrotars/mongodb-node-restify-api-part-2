import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

export const UserSchema = new Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	name: {
		first: {
			type: String,
			trim: true,
			required: true,
		},
		last: {
			type: String,
			trim: true,
			required: true,
		},
	},
}, { collection: 'users' })

UserSchema.plugin(timestamps)

export const User = mongoose.model('User', UserSchema)
