const Todo = require('../models/todo')

module.exports = function(server) {

	/**
	 * Create
	 */
	server.post('/users/:user_id/todos', (req, res, next) => {

		let data = Object.assign({}, { userId: req.params.user_id }, req.body) || {}

		Todo.create(data)
			.then(task => {
				res.send(200, task)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * List
	 */
	server.get('/users/:user_id/todos', (req, res, next) => {

		let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
            skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
            query = req.query || {}

        // remove skip and limit from query to avoid false querying
        delete query.skip
        delete query.limit

	    Todo.find(query).skip(skip).limit(limit)
			.then(users => {
				res.send(200, users)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * Get
	 */
	server.get('/users/:user_id/todos/:todo_id', (req, res, next) => {

		Todo.findById(req.params.user_id)
			.then(user => {
				res.send(200, user)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * Update
	 */
	server.put('/users/:user_id/todos/:todo_id', (req, res, next) => {

		let data = req.body || {},
			opts = {
                new: true
			}

		Todo.findByIdAndUpdate({ _id: req.params.todo_id }, data, opts)
			.then(user => {
				res.send(200, user)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * Delete
	 */
	server.del('/users/:user_id/todos/:todo_id', (req, res, next) => {

		Todo.findOneAndRemove({ _id: req.params.todo_id })
			.then(() => {
				res.send(204)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

}
