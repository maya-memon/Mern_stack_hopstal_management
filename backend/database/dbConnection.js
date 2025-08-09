import mongoose from "mongoose";
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected succesfuully");

    }).catch(err => {
        console.log(`Some error occuured while connecting database ${err}`)
    })
}