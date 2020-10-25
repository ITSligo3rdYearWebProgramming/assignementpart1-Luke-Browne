import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;

const opSchema = new Schema(
    {
    name: { type: String },
    opName: { type:String, required:true },
    ctu:  { type: String, required: true },
    id: { type:String, required: true, index:{unique:true} },
    },
    {toJSON: {virtuals:true}})

  opSchema.virtual('uri').get(function()  {
    return `/operators/${this._id}` ;
});

opSchema.plugin(uniqueValidator);

let Operator = mongoose.model('Operators', opSchema);

export { Operator }