import { Schema,model } from "mongoose";

const practiseSchema=new Schema({
    name:{type:String,required:true},
    subject:{type:String,required:true},
    details:{type:String,required:true}
})
const Practise=model("Practise",practiseSchema)
export default Practise