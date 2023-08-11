import React, { useState } from "react";
import IPurchases from "../../models/IPurchases";
import Purchase from "../purchase/Purchases";
import './Order.css';
import { AppState } from "../../redux/app-state";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Order(props: IPurchases) {
  const navigate = useNavigate();





 function getExtendedOrder(){

    navigate("/account/orders/" + props.id)
  }
  return (
    <div className="Order">
      <div className="order-card">
        <div className="order-title">
          <div className="imeg"><img src={props.imgUrl} className='img' alt="" />
          </div>
          <div className="button-coupon"><button className="button">view coupon</button>
          </div>
        </div>
        <div className="infromation-contianer">
          <div className="infromation">
            <div > order no: {props.id}</div>
            <div>name: {props.couponName} </div>
            <div> order date:{new Date(props.timestamp).toLocaleDateString()}</div>
            <div> amount: {props.amount}</div>
          </div>
          <div className="button-order">
            <button className="button" onClick={() => getExtendedOrder()}>view order </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
