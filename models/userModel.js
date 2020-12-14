import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        authId: {type: String, index : {unique : true}},
        name: String,
        email: { type: String,  index :{unique: true} },
        password: { type: String }, 
        permissionLevel: Number,  // for later athorization
        },
        { toJSON: { virtuals: true } } // include virtuals when document is converted to JSON  
);
// to ensure that index marked as unique will not be duplicated - in the case e-mail

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});



let User = mongoose.model('User', UserSchema);

export  { User }