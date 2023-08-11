import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActionType } from '../../redux/action-type';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PurchaseCustomer from './PurchaseCustomer';
import { AppState } from '../../redux/app-state';
import './PurchasesCustomer.css';



function PurchasesCustomer() {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  let [pageNumber, setPageNumber] = useState(1);
  const purchases = useSelector((state: AppState) => state.purchases);



  useEffect(() => {
    getPurchaseByCusromerId(pageNumber);
  }, [pageNumber]);

  async function getPurchaseByCusromerId(pageNumber: number) {

    try {

      let url = `http://localhost:8080/purchases/getExtendedPurchases?customerId=${customerId}&pageNumber=${pageNumber}`;

      let response = await axios.get(url);
      let purchases = response.data;


      dispatch({ type: ActionType.savePurchases, payload: { purchases } });
      debugger
    }
    catch (e: any) {
      console.error(e);
      if (e.response?.data?.error?.massage) {
          alert(e.response.data.error.massage)
      } else {
          alert("get invalid,try later")
      }
  }


  }

  return (
    <div className='Purchases-customer'>
      <table>
        <tr>
          <th>Coupon name</th>
          <th>Price</th>
          <th>Order date</th>
          <th>Amount</th>
          <th>Full name</th>
          <th>Address</th>
          <th>Phone number</th>

        </tr>
        {purchases.map((purchase) =>
          <PurchaseCustomer key={purchase.id} couponId={purchase.couponId} couponName={purchase.couponName} description={purchase.description}
            price={purchase.price} startDate={purchase.startDate} endDate={purchase.endDate} timestamp={purchase.timestamp} amount={purchase.amount} imgUrl={purchase.imgUrl}
            firstName={purchase.firstName} lastName={purchase.lastName} address={purchase.address} phoneNumber={purchase.phoneNumber}
            id={purchase.id} />)}
      </table>

    </div>
  );
} export default PurchasesCustomer