import React from 'react'
import { IPurchasesCompany } from '../../models/IPurchasesCompany';
import'./CustomersPurchaseByCompany.css'

function CustomersPurchase(props:IPurchasesCompany){
    return(
        <tr className='Customrs-purchase'>
        <td>{props.couponName}</td>
      <td>{props.firstName}   {props.lastName}</td>
      <td>{props.address}</td>
      <td>{props.phoneNumber}</td>
      <td>{new Date(props.timestamp).toLocaleDateString()}</td>
      <td>{props.amount}</td>
        </tr>
    );
}export default CustomersPurchase