import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppState } from '../../redux/app-state';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/action-type';
import Purchase from './Purchase';
import'./Purchases.css';


function Purchases() {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1)
    const purchases = useSelector((state: AppState) => state.purchases);

    useEffect(() => {
        getAllPurchases(pageNumber);
    }, [pageNumber]);

    
    async function getAllPurchases(pageNumber: number) {

        try {

            let url = `http://localhost:8080/purchases?pageNumber=${pageNumber}`;

            let response = await axios.get(url);
            let purchases = response.data;
            dispatch({ type: ActionType.savePurchases, payload: { purchases } });



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
        <div className="Purchases">
            <div className='puechases-contianer'>

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
                        <Purchase key={purchase.id} couponId={purchase.couponId} couponName={purchase.couponName} description={purchase.description}
                            price={purchase.price} startDate={purchase.startDate} endDate={purchase.endDate} timestamp={purchase.timestamp} amount={purchase.amount} imgUrl={purchase.imgUrl}
                            firstName={purchase.firstName} lastName={purchase.lastName} address={purchase.address} phoneNumber={purchase.phoneNumber}     
                            id={purchase.id} />)}                 
                </table>
                
            </div>

        </div>
    );

} export default Purchases