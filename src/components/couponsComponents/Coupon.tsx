import React, { useState } from 'react';
import './Coupon.css';
import ICoupon from "../../models/ICoupon";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import { ActionType } from '../../redux/action-type';



function Coupon(props: ICoupon) {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();


    function pegeCoupon(props: ICoupon) {

        navigate("/Coupon/" + props.id);
    }


    return (

        <div className='Coupon' onClick={() => pegeCoupon(props)}>


            <div className='imgBox'><img src={props.imgUrl} className='img' alt="" /></div>

            <div className='text'>
                <div> mame: {props.name}</div>
                <div> price: {props.price}</div>
                <div>expire:{new Date(props.endDate).toLocaleDateString()}</div>

            </div>


        </div>
    );
} export default Coupon