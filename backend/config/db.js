import mongoose from 'mongoose'

export const dbConnection= async()=>{
    try {

        await mongoose.connect("mongodb://localhost:27017/Calendar",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB Online")
        
    } catch (error) {
        console.log(error)
    }
}