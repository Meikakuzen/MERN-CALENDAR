import mongoose, { Schema } from 'mongoose'


const eventoSchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
})






const Evento = mongoose.model("Evento", eventoSchema)

export default Evento