import { User } from './userModel';
import crypto from 'crypto'

function readUser(req, res){
    const id = req.params.id;
    User.findById(id)
    .then((result) => res.json(result))
    .catch ((error) => res.status(404).json({error: 'not found' + error}))
}




function createUser (req, res)  {

    // to do! need to check that the password exists before doing this 
    

    if (!req.body.password)
    {
        res.status(412).json({ status: 'fail', message: 'not created ' + error })
    }
   
   
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512',salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    //req.body.permissionlevel = 1;

    const user = new User(req.body);
    user.save()
    .then((result) => {
        console.log('user created');
        res.location(result.id)
            .status(201)
            .json({ id: result.id })
    })
    .catch((error) => {
        res.status(412).json({ status: 'fail', message: 'not created ' + error })
    });
};

function createOrUpdateFacebookUser (req, res){
    
}


function readUsers (req, res) {

    User.find()
    .then((result) => {
        res.json(result)
    })
    .catch((error) =>
        res.status(500).json({ error: 'An error' + error }))
}
            

function findUserByEmail (email) {
    return User.find({email: email});

}

function findUserByAuthId (authId){
    return User.find({authId: authId})
}

// patchUser = (id, userData) => {
//     return User.findOneAndUpdate({
//         _id: id
//     }, userData);
// };

function deleteUser(req, res) {
    const id = req.params.id;

    User.findByIdAndDelete(id).
        then((result) => {
            if (result) {
                res.status(203).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' + error }));
}


export default { readUsers, createUser, readUser, deleteUser, findUserByEmail, findUserByAuthId}
