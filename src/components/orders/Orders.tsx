import React, { useEffect, useState } from 'react'
import { ActionType } from '../../redux/action-type';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import Order from './Order';
import './Orders.css';
import { useParams } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

function Orders() {
 const{id}=useParams();
    const dispatch = useDispatch();
    let [totalPages, setTotalPages] = useState(10);
    let [pageNumber, setPageNumber] = useState(1);
    const purchases = useSelector((state: AppState) => state.purchases);
    const customerId = useSelector((state: AppState) => state.customer.id);
    const userType = useSelector((state: AppState) => state.user.userType);
    const onPageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    useEffect(() => {
       
            getPurchaseByCusromerId(customerId, pageNumber);
        
       
    }, [pageNumber]);


    async function getPurchaseByCusromerId(customerId: number, pageNumber: number) {

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

        <div className='Orders'>

            <div className='orders-contianer ' >
                {purchases.map((order) =>
                    <Order key={order.id} couponId={order.couponId} couponName={order.couponName} description={order.description}
                        price={order.price} startDate={order.startDate} endDate={order.endDate} timestamp={order.timestamp} amount={order.amount} imgUrl={order.imgUrl}
                        id={order.id} />)}

            </div>
            <div className="pages">
                <div className="page-number">  <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} /></div>
            </div>

        </div>
    );
} export default Orders

