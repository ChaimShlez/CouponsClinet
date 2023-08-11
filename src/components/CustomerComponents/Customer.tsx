import axios from "axios";
import React, { useEffect, useState } from "react";
import Coupon from "../couponsComponents/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { useNavigate, useParams } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import './Customer.css';
import { BiUserCircle } from "react-icons/bi";




function Customer() {

    const user = useSelector((state: AppState) => state.user);
    const customer = useSelector((state: AppState) => state.customer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = user.id;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [address, setAddress] = useState(customer.address);
    const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

    useEffect(() => {
        getCustomerById();
    }, []);

    async function getCustomerById() {
        try {

            let url = `http://localhost:8080/customers/${user.id}`;

            let response = await axios.get(url);
            let customer = response.data;

            console.log(customer);

            dispatch({ type: ActionType.saveCustomer, payload: { customer } });
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

    async function updateCustomer() {
        debugger
        try {
            await axios.put("http://localhost:8080/customers", {
                user: {
                    id,
                    firstName,
                    lastName,
                },
                address,
                phoneNumber,
                id
            }
            );
        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("update invalid,try later")
            }
        }
    }
    return (
        <div className="Customer">
            <div className="wrapper-customer">
                <div className='customer-details' >

                    <div className="title"> < BiUserCircle className="title-icon" /> <div className="form-title"> <h6>Customer details</h6></div></div>
                    <div className="form">

                        <div className="input-box">
                            <label>  First name:</label>
                            <input type="text" defaultValue={user.firstName} required onChange={(event) => setFirstName(event.target.value)} />
                        </div>
                        <div className="input-box">
                            <label> Last name:</label>

                            <input type="text" defaultValue={user.lastName} required onChange={(event) => setLastName(event.target.value)} />
                        </div>
                        <div className="input-box">
                            <label> Address:</label>
                            <input type="text" defaultValue={customer.address} required onChange={(event) => setAddress(event.target.value)} />
                        </div>
                        <div className="input-box">
                            <label>  Phone number:</label>
                            <input type="text" defaultValue={customer.phoneNumber} required onChange={(event) => setPhoneNumber(event.target.value)} />
                        </div>
                    </div>
                    <div className="button-customer" > <input type="button" className="button-edit" value="edit" onClick={updateCustomer} /></div>
                    
                </div>
            </div>
        </div>
    );
} export default Customer;