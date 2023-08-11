import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Purchase from "../purchase/Purchases";
import IPurchases from "../../models/IPurchases";
import './ExtendedOrder.css';

function ExtendedOrder() {
  const { purchaseId } = useParams();

  const [order, setOrder] = useState<IPurchases>({
    id: 0, couponId: 0, couponName: '', description: '', price: 0, startDate: '', endDate: "", timestamp: '', amount: 0
    , imgUrl: '', firstName: '', lastName: '', address: '', phoneNumber: ''
  })


  useEffect(() => {
    getPurchaseByCouponId();


  }, []);

  async function getPurchaseByCouponId() {


    try {
      let url = `http://localhost:8080/purchases/getExtendedOnPurchase?purchaseId=${purchaseId}`;
      let response = await axios.get(url);
      let order = response.data;
      setOrder(order)

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
    <div className="Extended-order">
      <div className="card-container">
        <div className="order-title">
          <h6>ORDER DETAILS</h6>
        </div>
        <div className="infromation-details">
          <div className="order-details">
            <div className="title-order-no" >
              <span className="title"> order no:</span><span className="title">{order.id}</span>
            </div>
            <div className="title-order-no">
              <span className="title">order date:</span>  <span className="title">{new Date(order.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="delivery-address">
            <div className="delivery-address-title">
              <h6 >DELIVERY ADDRESS</h6>
            </div>
            <div className="details-user">
              <div className="title-user">
                <span className="title">first name:</span> <span className="title">{order.firstName}</span>
              </div>
              <div className="title-user">
                <span className="title"> last name:</span> <span className="title">{order.lastName}</span>
              </div>
              <div className="title-user">
                <span className="title">address: </span><span className="title"> {order.address}</span>
              </div>
              <div className="title-user">
                <span className="title">phone number:</span><span className="title"> {order.phoneNumber}</span>
              </div>
            </div>
          </div>
          <div className="details-coupon">
              <h6>COUPON DETAILS</h6>
            </div>
          <div className="contianer-coupon">
           
            <div className="imeg">
              <img src={order.imgUrl} className='img' alt="" />
            </div>
            <div className="coupon">
              <div className="title-coupon">
                <span className="title">name:</span> <span className="title">{order.couponName}</span>
              </div>
              <div className="title-coupon">
                <span className="title"> description:</span>   <span className="title">{order.description}</span>
              </div>
              <div className="title-coupon">
                <span className="title"> price: </span> <span className="title">{order.price}</span>
              </div>
              <div className="title-coupon">
                <span className="title"> amount: </span>   <span className="title"> {order.amount}</span>
              </div>
             
              
            </div>
          </div>


        </div>
      </div>
    </div>
  );
} export default ExtendedOrder;