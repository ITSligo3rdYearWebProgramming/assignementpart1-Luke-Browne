
import { CTU } from "./ctuModel";

function readCTUs(req, res, options = []) { // Reads all CTUs from DB
    const { name } = req.query;
    let filter = {};

    if(name){
        filter.name = { $regex: `^${name}$`, $options: 'i' };
    }

    CTU.find(filter)
            .then((result) => {
                res.json(result)
            })
            .catch((error) => 
                    res.status(500).json({error: 'An error' + error}))

}

function readCTU(req, res){ // Reads an individual CTU by ID
    const id = req.params.id;
    CTU.findById(id)
            .then((result) => {
                console.log('result' + result.uri );
                res.json(result)
            })
            .catch((error) => 
                    res.status(404).json({error: 'not found'}))
}

function createCTU(req, res){ // Creates a new CTU
    let ctuDoc = new CTU(req.body);
    ctuDoc.save()
        .then((result) => {
            console.log('CTU Saved');
            res.location(result.uri)
                .status(201)
                .json({id: result._id, uri: result.uri})
        })
        .catch((error) => {
            res.status(412).json({status: 'fall', message: 'Not Created' + error})
        })
        console.log('Promising to save');
}

function updateCTU(req, res){ // Updates an CTU with new details
    const id = req.params.id;

    console.log('Updating CTU' + id)

    CTU.findByIdAndUpdate({_id: id}, {...req.body})
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

function deleteCTU(req, res) { // Deletes a CTU
    const id = req.params.id;

    CTU.findByIdAndDelete(id).
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

export default { createCTU, readCTU, readCTUs, deleteCTU, updateCTU }