/**
 * Module Dependencies
 */
const restify = require('restify'),
	  mongoose = require('mongoose')

/**
 * Config
 */
const config = require('./config')

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version
})

/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())

/**
 * Start Server, Connect to DB & Require Route Files
 */
server.listen(config.port, () => {

	/**
	 * Connect to MongoDB via Mongoose
	 */
	const opts = {
	    promiseLibrary: global.Promise,
	    server: {
	        auto_reconnect: true,
	        reconnectTries: Number.MAX_VALUE,
	        reconnectInterval: 1000,
	    },
	    config: {
	        autoIndex: true,
	    },
	}

	mongoose.Promise = opts.promiseLibrary
	mongoose.connect(config.db.uri, opts)

	const db = mongoose.connection

	db.on('error', (err) => {
	    if (err.message.code === 'ETIMEDOUT') {
	        console.log(err)
	        mongoose.connect(config.db.uri, opts)
	    }
	})

	db.once('open', () => {

		require('./routes/user')(server)
		require('./routes/todo')(server)

		console.log(`Server is listening on port ${config.port}`)

	})

})
