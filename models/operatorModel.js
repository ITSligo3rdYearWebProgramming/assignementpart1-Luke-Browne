import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;

const opSchema = new Schema( // Operator Schema
    {
    name: { type: String }, // Real Name
    opName: { type:String, required:true }, // Code Name
    ctu:  { type: String, required: true }, // Team Name
    icon: { type:String, required: true }, // Op Icon Image
    country: { type:String, required:true }, // Country Flag Image
    side: { type:String, required:true }, // Attack or Defense
    role: { type:String }                // job on the team
    },         
    {toJSON: {virtuals:true}})
  opSchema.virtual('uri').get(function()  {
    return `/operators/${this._id}` ;
});

opSchema.plugin(uniqueValidator);

let Operator = mongoose.model('Operators', opSchema);

export { Operator }