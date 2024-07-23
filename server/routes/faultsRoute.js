var express = require('express');
var router = express.Router();
const faultService = require('../services/faultsServices');
const { validateCheck } = require('../middleware/validator')
const { validationObj } = require('../utility/validateReqBodyObj')
const { createPage } = require('../utility/pagination')



//Create
router.post('/', validateCheck(validationObj), async(req, res, next) => {
    try{
        const get_error = req.currentError;
        if(get_error){
            return res.status(404).json(get_error.message);
        }else{
            payload = req.body;
            const fault = await faultService.create(payload)
            return res.status(200).json(fault)
        }
    }catch(err){
      return res.status(404).json(err)
    }
});



//Get ALL with pagination
router.get('/:filter', async (req, res, next) => {
  const search = req.query.search;
  const filter= req.params.filter;

  try {
    const faultsList = await faultService.getFaults(filter, search);
    return res.status(200).json(faultsList);
  } catch (err) {
    return res.status(400).json({ message: "Internal Server error" });
  }
});



//Get by id
router.get('/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const faults = await faultService.getByid(id)
        if(!faults){
            return res.status(404).json({ message: 'Not Found Fault by id'})
        }else{
            return res.status(200).json(faults)
        }
    }catch(err){
        return res.status(404).json(err)
    }
});




//Update By id
router.put('/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const payload = req.body;
        const foundFaults = await faultService.getByid(id)
        if(!foundFaults){
            return res.status(404).json({ message: 'Not Found Fault by id'})
        }else{
            const updateFaults = await faultService.updateByid(id, payload)
            return res.status(200).json(updateFaults)
        }
    }catch(err){
        return res.status(404).json(err)
    }
});



//Delete By Id
router.delete('/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const faults = await faultService.deleteByid(id)
        return res.status(200).json({ message: 'Fault Deleted Successfully...'})
    }catch(err){
        return res.status(404).json(err)
    }
});



router.get('/', async (req, res, next) => {
    try {
      const faultsList = await faultService.getAll();
      return res.status(200).json(faultsList);
    } catch (err) {
      return res.status(400).json({ message: "Internal Server error" });
    }
  });

module.exports = router;