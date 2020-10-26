import express from 'express';

import db from '../models/loadoutService';

const router = express.Router(); 

router.post('/', (req, res) => { // by having a post request it will create a new loadout
    db.createLoadout(req, res);
});

router.get('/', (req, res) => { // by having a get request it will list the loadout
    db.readLoadouts(req, res);
})

 router.get('/:id', (req,res) => { // having a get request followed by /id will display the loadout with that id
    db.readLoadout(req,res);
})

router.delete('/:id',(req, res) => { // having a delete request followed by /id will delete the loadout with that id
    db.deleteLoadout(req, res);
})

router.put('/:id', (req, res) => { // having a put request followed by /id will update the loadout with the new information
    db.updateLoadout(req,res)
})
  
  export default router;