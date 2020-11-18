import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;

const opSchema = new Schema( // Operator Schema
    {
    name: { type: String }, // Real Name
    opName: { type:String, required:true }, // Code Name
    ctu:  { type: String, required: true }, // Team Name
    icon: { type:String, required: true },  // Op Icon Image
    },         
    {toJSON: {virtuals:true}})
  opSchema.virtual('uri').get(function()  {
    return `/operators/${this._id}` ; // eg. Jager is a Defender from the GSG9 which is German so - GER-D-1
});

opSchema.plugin(uniqueValidator);

let Operator = mongoose.model('Operators', opSchema);

export { Operator }