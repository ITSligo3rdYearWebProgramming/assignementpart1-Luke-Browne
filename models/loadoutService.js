import { Loadout } from "./loadoutModel";

function readLoadouts(req, res, options = []) { // Reads all Loadouts from DB
    const { name } = req.query;
    let filter = {};

    if(name){
        filter.name = { $regex: `^${name}$`, $options: 'i' };
    }

    Loadout.find(filter)
            .then((result) => {
                res.json(result)
            })
            .catch((error) => 
                    res.status(500).json({error: 'An error' + error}))

}

function readLoadout(req, res){ // Reads an individual Loadout by ID
    const id = req.params.id;
    Loadout.findById(sid)
            .then((result) => {
                console.log('result' + result.uri );
                res.json(result)
            })
            .catch((error) => 
                    res.status(404).json({error: 'not found'}))
}

function createLoadout(req, res){ // Creates a new Loadout
    let loadoutDoc = new Loadout(req.body);
    loadoutDoc.save()
        .then((result) => {
            console.log('Loadout Saved');
            res.location(result.uri)
                .status(201)
                .json({id: result._id, uri: result.uri})
        })
        .catch((error) => {
            res.status(412).json({status: 'fall', message: 'Not Created' + error})
        })
        console.log('Promising to save');
}

function updateLoadout(req, res){ // Updates an Loadout with new details
    const id = req.params.id;

    console.log('Updating Loadout' + id)

    Loadout.findByIdAndUpdate({_id: id}, {...req.body})
            .then((result) => {
                if(result){
                    res.status(200).send({message: 'Updated'})
                }
                else{
                    res.status(404).send({message: 'Not Found'})
                }
            })
            .catch((error) => 
                    res.status(404).send({message: 'Not Found' + error}));
}

function deleteLoadout(req, res) { // Deletes a Loadout
    const id = req.params.id;

    Loadout.findByIdAndDelete(id).
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

export default { createLoadout, readLoadout, readLoadouts, deleteLoadout, updateLoadout }