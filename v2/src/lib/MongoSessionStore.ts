import {Connection} from 'mongoose';
var session = require('express-session');
var mongoStoreFactory = require('connect-mongo');
var MongoStore = mongoStoreFactory(session);

export class MongoSessionStore {

    public static createSessionStore(connection: Connection, collection: string) {
        return  new MongoStore({
            mongooseConnection: connection,
            collection: collection
        });
    }
}

