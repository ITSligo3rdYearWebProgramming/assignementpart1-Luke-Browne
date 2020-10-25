import express from 'express';

import db from '../models/operatorService';

const router = express.Router(); 

router.post('/', (req, res) => { // by having a post request it will create a new operator
    db.createOperator(req, res);
});

router.get('/', (req, res) => { // by having a get request it will list the operators
    db.readOps(req, res);
})

 router.get('/:id', (req,res) => { // having a get request followed by /id will display the operator with that id
    db.readOperator(req,res);
})

router.delete('/:id',(req, res) => { // having a delete request followed by /id will delete the operator with that id
    db.deleteOperator(req, res);
})

router.put('/:id', (req, res) => { // having a put request followed by /id will update the operator with the new information
    db.updateOperator(req,res)
})
  
  export default router;