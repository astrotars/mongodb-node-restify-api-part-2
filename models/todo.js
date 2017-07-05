import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

export const TodoSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
	},
	todo: {
		type: String,
		trim: true,
		required: true,
	},
	status: {
        type: String,
        enum: [
            'pending',
			'in progress',
            'complete',
        ],
        default: 'pending',
    },
}, { collection: 'todos' })

TodoSchema.plugin(timestamps)

export const Todo = mongoose.model('Todo', TodoSchema)
