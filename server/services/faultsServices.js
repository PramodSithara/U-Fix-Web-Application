const Fault = require('../models/faults')


//Create 
const create = async (data) => {
    try{
        const newFault = new Fault(data)
        await newFault.save();
        return newFault
    }catch(err){
        throw err
    }
}



//Get by id
const getByid = async (id) => {
    try{
        return await Fault.findOne({ _id: id})
    }catch(err){
        throw err
    }
}



//Update by id
const updateByid = async (id, payload) => {
    try{
        const updateFault = await Fault.findOneAndUpdate(
            { _id: id},
            payload,
            { new: true}
        ).exec();
        return updateFault;
    }catch(err){
        throw err
    }
}



//Delete by id
const deleteByid = async (id) => {
    try{
        return await Fault.findOneAndDelete({ _id: id })
    }catch(err){
        throw err
    }
}



//Get All with pagination
const getFaults = async (filter, item) => {
    
    try{
        const identi = new RegExp(item, 'i')
        const faultsList = await Fault.find({category: filter, identification: identi }).exec();
        return faultsList
    }catch(err){
        throw err
    }
}



//get all
const getAll = async () => {
    try{
        return await Fault.find({})
    }catch(err){
        throw err
    }
}


module.exports = {
    create,
    getFaults,
    getByid,
    updateByid,
    deleteByid,
    getAll
}