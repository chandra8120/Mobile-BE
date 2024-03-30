import { Schema,model } from "mongoose"

const formShema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    date_of_appointment:{type:Date,required:true},
    time_of_appointment:{type:String,required:true},
    treatment:{type:String,required:true},
    doctor:{type:String,required:true},
    message:{type:String,required:true}
})
const FormModel=model("Model",formShema)
export default FormModel