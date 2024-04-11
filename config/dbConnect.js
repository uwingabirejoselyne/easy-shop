const { default: mongoose } = require("mongoose")

const dbConnect = () =>{
    try {
        const conn = mongoose.connect('mongodb://localhost:27017/easy-shop')
        console.log('database is successful connected');
    } catch (error) {
        console.log('database error');
    }
}
module.exports =dbConnect