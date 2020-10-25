import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;

const opSchema = new Schema( // Operator Schema
    {
    name: { type: String }, // Real Name
    opName: { type:String, required:true }, // Code Name
    ctu:  { type: String, required: true }, // Team Name
    id: { type:String, required: true, index:{unique:true} }, // Custom ID based on first 3 letters of country or
    },                                                          // CTU followed by A (Attack) or D (Defence)
    {toJSON: {virtuals:true}})                            // and for CTUs with more than 1 Operator on Attack/Defence
                                                                // a 1 or 2 
  opSchema.virtual('uri').get(function()  {
    return `/operators/${this._id}` ; // eg. Jager is a Defender from the GSG9 which is German so - GER-D-1
});

opSchema.plugin(uniqueValidator);

let Operator = mongoose.model('Operators', opSchema);

export { Operator }