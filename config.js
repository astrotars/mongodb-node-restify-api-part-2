'use strict'

module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://nick:ni05pa904427*@free-shard-00-00-zftrn.mongodb.net:27017,free-shard-00-01-zftrn.mongodb.net:27017,free-shard-00-02-zftrn.mongodb.net:27017/todos?ssl=true&replicaSet=FREE-shard-0&authSource=admin',
    }
}
