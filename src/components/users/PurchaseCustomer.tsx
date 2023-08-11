import React from "react";
import IPurchases from "../../models/IPurchases";
import './PurchaseCustomer.css'


function PurchaseCustomer(props:IPurchases){



    return(
        <tr className='Purchase-customer'>
      <td>{props.couponName}</td>
      <td>{props.price}</td>
      <td>{new Date(props.timestamp).toLocaleDateString()}</td>
      <td>{props.amount}</td>
      <td>{props.firstName}     {props.lastName}</td>
      <td>{props.address}</td>
      <td>{props.phoneNumber}</td>
      
     
      

    </tr>
    );
} export default PurchaseCustomer
