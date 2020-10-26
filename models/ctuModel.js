import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;

const ctuSchema = new Schema( // CTU Schema
    {
    name: { type: String }, // CTU Name
    country: { type:String, required:true }, // Country of Origin
    id: { type:String, required: true, index:{unique:true} }, // Custom ID 
    },                                                        
    {toJSON: {virtuals:true}})                         

  ctuSchema.virtual('uri').get(function()  {
    return `/ctus/${this._id}`;
});

ctuSchema.plugin(uniqueValidator);

let CTU = mongoose.model('CTUs', ctuSchema);

export { CTU }