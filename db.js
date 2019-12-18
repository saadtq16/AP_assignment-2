const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "mongodb_crud";
const url = "mongodb://localhost/27017";
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};
const connect = function(cb){
    if(state.db){
        cb();
    }
    else{
        MongoClient.connect(url, mongoOptions, function(err, client){
            if(err){
                cb(err);
            }
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}
const getPrimaryKey = function(_id){
    return ObjectID(_id);
}
const getDB = function(){
    return state.db;
}
module.exports = {getDB, connect, getPrimaryKey};