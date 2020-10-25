
import { Operator } from "./operatorModel";

function readOps(req, res, options = []) {
    const { name } = req.query;
    let filter = {};

    if(name){
        filter.name = { $regex: `^${name}$`, $options: 'i' };
    }

    Operator.find(filter)
            .then((result) => {
                res.json(result)
            })
            .catch((error) => 
                    res.status(500).json({error: 'An error' + error}))

}

function readOperator(req, res){
    const id = req.params.id;
    Operator.findById(id)
            .then((result) => {
                console.log('result' + result.uri );
                res.json(result)
            })
            .catch((error) => 
                    res.status(404).json({error: 'not found'}))
}

function createOperator(req, res){
    let opDoc = new Operator(req.body);
    opDoc.save()
        .then((result) => {
            console.log('Operator Saved');
            res.location(result.uri)
                .status(201)
                .json({id: result._id, uri: result.uri})
        })
        .catch((error) => {
            res.status(412).json({status: 'fall', message: 'Not Created' + error})
        })
        console.log('Promising to save');
}

function updateOperator(req, res){
    const id = req.params.id;

    console.log('Updating Operator' + id)

    Operator.findByIdAndUpdate({_id: id}, {...req.body})
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

function deleteOperator(req, res) {
    const id = req.params.id;

    Operator.findByIdAndDelete(id).
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

export default { createOperator, readOperator, readOps, deleteOperator, updateOperator }