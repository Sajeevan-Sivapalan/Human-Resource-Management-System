import React, {useState, useEffect} from 'react';
import axois from "axios";
import { Link} from 'react-router-dom';
import TransportPaymentCard from './TransportPaymentCard'
import AddTransportPayment from './AddTransportPayment';
import useTitle from '../../hooks/useTitle';

export default function  TransportPaymentList(){
    useTitle("Transport Payment");

const [TransportPayments, setTransportPayments] = useState([]);
const[Keyword, setKeyword] = useState('')

useEffect(() => {
   function getTransportPayments(){
        axois.get("http://localhost:5000/api/TransportPayment/",).then((res) => {
           console.log(res.data);
            setTransportPayments(res.data);   
        }).catch((err) => {
          alert(err.message);
        })
   }  
getTransportPayments();
},[])
 const filteredTransportPayments=TransportPayments.filter((transportpayment) => {
     const  company = transportpayment.Company.toLowerCase()
     const date = transportpayment.Date.toLowerCase()
     
     const keyword = Keyword.toLowerCase()

     return company.includes(keyword)  || date.includes(keyword) 
 })

    
const renderTransportPaymentsList =filteredTransportPayments.map((transportpayments) =>{
   return(
          <TransportPaymentCard transportpayments={transportpayments}/>
   )

})
return(
    <>
    <div class="request">
        <div class="row justify-content-end">
            <AddTransportPayment></AddTransportPayment>
        </div>
    </div>
    <div class="search">
        <div class="row justify-content-center">
        <input type="text" class="form-control search-bar" id='searchTransportPayment' placeholder='Enter Search Keyword' value={Keyword} onChange={(e) => setKeyword(e.target.value)} />        </div>
    </div>
    <div>
        <div class="leave-list">
            <div class="row justify-content-center">
            <table className="table table-striped table-hover">
                  <tr>
                      <th>Company</th>
                      <th>Account_No</th>
                      <th>Date</th>
                      <th>Distance</th>
                      <th>Total</th>
                      
                      <th></th>
                  </tr>

                  <tbody>
                      {renderTransportPaymentsList}
                  </tbody>
              </table>
            </div>
        </div>
    </div>
</>
)

}

 
