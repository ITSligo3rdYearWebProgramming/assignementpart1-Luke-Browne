import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const Schema = mongoose.Schema;

const loadoutSchema = new Schema( // Loadout Schema
    {
    primary: {type: String, required:true }, // Primary Weapon name
    secondary: { type:String, required:true }, // Secondary Weapon name
    gadget: { type:String, required: true }, // Selected Gadget
    ability: { type:String, required:true }, // Unique Ability name
    linkedOp: { type:String }               // Associated Operator
    },                                                        
    {toJSON: {virtuals:true}})                         

  loadoutSchema.virtual('uri').get(function()  {
    return `/loadouts/${this._id}`;
});

loadoutSchema.plugin(uniqueValidator);

let Loadout = mongoose.model('Loadouts', loadoutSchema);

export { Loadout }