import express from 'express';

import db from '../models/ctuService';

const router = express.Router(); 

router.post('/', (req, res) => { // by having a post request it will create a new CTU
    db.createCTU(req, res);
})

router.get('/', (req, res) => { // by having a get request it will list the CTUs
    db.readCTUs(req, res);
})

 router.get('/:id', (req,res) => { // having a get request followed by /id will display the CTU with that id
    db.readCTU(req,res);
})

router.delete('/:id',(req, res) => { // having a delete request followed by /id will delete the CTU with that id
    db.deleteCTU(req, res);
})

router.put('/:id', (req, res) => { // having a put request followed by /id will update the CTU with the new information
    db.updateCTU(req,res)
})
  
  export default router;