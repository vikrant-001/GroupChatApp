const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log(`Mongo Db Connected Successfully ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Error: ${err.message}`);
        process.exit();
    }
}

module.exports = connectDb;