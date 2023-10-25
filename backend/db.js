const mongoose = require('mongoose');

module.exports =()=>{

    const dbRoute =
    ' mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1';

mongoose.Promise = global.Promise;

    const connectionParams = (dbRoute,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
    });

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connected to database successfully')
    } catch (error) {
        console.log(error)
        console.log('could not to database!')

    }
}