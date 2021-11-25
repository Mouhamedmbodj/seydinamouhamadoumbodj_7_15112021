require('dotenv/config');
module.exports={
    database:{
        host: 'localhost',
        user:'root',
        database:process.env.DATABASE,
        password:process.env.PASSWORD,
    }
}