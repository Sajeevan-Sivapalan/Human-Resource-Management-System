const TransportPaymentModel = require('../models/TransportPayment.model');

const createTransportPayment = async (req,res) => {

  const{Company, Account_No, Date, Distance, Total} = req.body;

  const TransportPayment = new TransportPaymentModel({Company, Account_No, Date, Distance, Total});

 try{
    const newTransportPayment = await TransportPayment.save();
    if(newTransportPayment){
        res.status(201).send(newTransportPayment);
         
    }
 }
catch (err){
    res.status(500).send(err);
}

}

const getAllTransportPayments = async (req,res) => {
   try{
    const TransportPayments = await TransportPaymentModel.find();
    if(TransportPayments){
        res.status(200).send(TransportPayments);
    }
   }
   catch (err){
       res.status(500).send(err);   
   }

}
const getTransportPaymentById = async (req,res) => {
    const id = req.params.id;
    try{
        const TransportPayment = await TransportPaymentModel.findById(id);
          if(TransportPayment){
            res.status(200).send(TransportPayment);
          }
    }

    catch(err){
        res.status(500).send(err);
    }
}

const updateTransportPayment = async (req,res) => {
   const id = req.params.id;

   const{Company, Account_No, Date, Distance, Total} = req.body;

try{
    const updatedTransportPayment = await TransportPaymentModel.findByIdAndUpdate(id, {Company, Account_No, Date, Distance, Total});
    if(updatedTransportPayment){
        res.status(200).send(updatedTransportPayment);
    }
}
catch (err){
    res.status(500).send(err);
}

}

const deleteTransportPayment = async (req,res) => {
    const id = req.params.id;
    try{
        const deletedTransportPayment = await TransportPaymentModel.findByIdAndDelete(id)
    
    if(deletedTransportPayment) {
        res.status(200).send(deletedTransportPayment);
    }
}
catch (err) {
    res.status(500).send(err);
}

}
module.exports = {createTransportPayment,getAllTransportPayments,getTransportPaymentById,updateTransportPayment,deleteTransportPayment};
