const mongo = require("mongoose");

const connectToMongo = async() => {
    try {
        await mongo.connect(process.env.Mongo_Db_Url);
        console.log('connected successfully');
    } catch {
        console.log('error connecting');
    }
}
module.exports = connectToMongo;