const resourceModel = require('../models/resourceModel')
const mongoose = require('mongoose')

//Create and save a new resource
const createResource = async (req,res) => {
    const {name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL} = req.body
    const resource = new resourceModel({name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL})

    try{
        const newResource = await resource.save()
        if(newResource){
            res.status(201).send(newResource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const getAllResources = async (req,res) => {
    try{
        const resources = await resourceModel.find()
        if(resources){
            res.status(200).send(resources)
        }
    }catch(error){
        res.status(500).send(error) 
    }
}

const getResourceById = async (req,res) => {
    const id = req.params.id
    try{
        const resource = await resourceModel.findById(id)
        if(resource) {
            res.status(200).send(resource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const updateResource = async (req,res) => {
    const id = req.params.id
    const {name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL} = req.body
   
    try{
        const updatedResource = await resourceModel.findByIdAndUpdate(id, {name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL})
        if(updatedResource){
            res.status(200).send(updatedResource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const assignEmployee = async (req,res) => {
    const id = req.params.id
    const {employeeName,updatedQuantity} = req.body
    console.log(employeeName)
    try{
        const updatedResource = await resourceModel.findByIdAndUpdate(id, { $push: {employeesAssigned: employeeName } , quantity: updatedQuantity})
        if(updatedResource){
            res.status(200).send(updatedResource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const revokeEmployee = async (req,res) => {
    const id = req.params.id
    const {employee} = req.body
    console.log(employee)
    try{
        const updatedResource = await resourceModel.findByIdAndUpdate(id, { $pull: {employeesAssigned: employee } })
        if(updatedResource){
            res.status(200).send(updatedResource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const updateQuantity = async (req,res) => {
    const id = req.params.id
    const {updatedQuantity} = req.body
    console.log(req.body)
    try{
        const updatedQty = await resourceModel.findByIdAndUpdate(id, {quantity: updatedQuantity })
        if(updatedQty){
            res.status(200).send(updatedQty)
        }
    }catch(error){
        res.status(500).send(error)
    }
}


const deleteResource = async (req,res) => {
    const id = req.params.id
    try{
        const deletedResource = await resourceModel.findByIdAndDelete(id)
        if(deletedResource){
            res.status(200).send(deletedResource)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    assignEmployee,
    revokeEmployee,
    updateQuantity, 
    deleteResource
}