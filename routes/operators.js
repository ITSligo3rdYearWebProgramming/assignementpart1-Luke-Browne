import express from 'express';

import db from '../models/operatorService';

const router = express.Router();

router.post('/', (req, res) => {
    db.createOperator(req, res);
});

router.get('/', (req, res) => {
    db.readOps(req, res);
})

 router.get('/:id', (req,res) => {
    db.readOperator(req,res);
})

router.delete('/:id',(req, res) => {
    db.deleteOperator(req, res);
})

router.put('/:id', (req, res) => {
    db.updateOperator(req,res)
})
  
  export default router;