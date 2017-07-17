const User = require('../models/user'),
	  Todo = require('../models/todo')

module.exports = function(server) {

	/**
	 * Create
	 */
	server.post('/users', (req, res, next) => {

		let data = req.body || {}

		User.create(data)
			.then(user => {
				res.send(200, user)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * List
	 */
	server.get('/users', (req, res, next) => {

		let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
            skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
            query = req.query || {}

        // remove skip and limit from query to avoid false querying
        delete query.skip
        delete query.limit

	    User.find(query).skip(skip).limit(limit)
			.then(users => {
				res.send(200, users)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	/**
	 * Read
	 */
	server.get('/users/:userId', (req, res, next) => {

		User.findById(req.params.userId)
			.then(user => {

				if (!user) {
					res.send(404)
					next()
				}

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
	server.put('/users/:userId', (req, res, next) => {

		let data = req.body || {},
			opts = {
                new: true
			}

		User.findByIdAndUpdate({ _id: req.params.userId }, data, opts)
			.then(user => {

				if (!user) {
					res.send(404)
					next()
				}

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
	server.del('/users/:userId', (req, res, next) => {

		const userId = req.params.userId

		User.findOneAndRemove({ _id: userId })
			.then((user) => {

				if (!user) {
					res.send(404)
					next()
				}

				// remove associated todos to avoid orphaned data
				Todo.deleteMany({ _id: userId })
					.then(() => {
						res.send(204)
						next()
					})
					.catch(err => {
						res.send(500, err)
					})
			})
			.catch(err => {
				res.send(500, err)
			})

	})

}
