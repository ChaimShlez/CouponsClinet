import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IUser from '../../models/IUser';
import User from './User';
import './Users.css';
import { ActionType } from '../../redux/action-type';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import ICustomer from '../../models/ICustomer';
import CustomerDetails from './CustomerDetails';
import Pagination from '../pagination/Pagination';


function Users() {

    let [pageNumber, setPageNumber] = useState(1);
    const users = useSelector((state: AppState) => state.users);
    const customers = useSelector((state: AppState) => state.customers);
    let [totalPages, setTotalPages] = useState(10);
    const dispatch = useDispatch();
    const [userType, setUserType] = useState("CUSTOMER")

    const onPageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    const handleTypeSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedType = event.target.value;

        setUserType(selectedType);
    };
    useEffect(() => {
        if (userType == "COMPANY") {
            getAllUsers(pageNumber);
        }
        else {
            getAllCustomers(pageNumber);
        }

    }, [pageNumber, userType]);

    function onNextClicked() {
        pageNumber++;
        setPageNumber(pageNumber);
    }

    function onBackClicked() {
        pageNumber--;
        setPageNumber(pageNumber);
    }

    async function getAllUsers(pageNumber: number) {

        try {

            let url = `http://localhost:8080/users/byUserType?pageNumber=${pageNumber}&userType=${userType}`;

            let response = await axios.get(url);
            let users = response.data;

           debugger
            dispatch({ type: ActionType.saveUsers, payload: { users } });
            console.log(users);

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
    async function getAllCustomers(pageNumber: number) {

        try {

            let url = `http://localhost:8080/customers?pageNumber=${pageNumber}`;

            let response = await axios.get(url);
            let customers = response.data;
            debugger
            dispatch({ type: ActionType.seveCustomers, payload: { customers } });





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
        <div className='Users'>
            <div className='users-container'>
                <select name="type" id="type" onChange={handleTypeSelectChange}>
                    <option value={"CUSTOMER"}>customers</option>
                    <option value={"COMPANY"}>companies</option>


                </select>
                {userType == "CUSTOMER" && <table>
                    <tr>
                        <th>User name</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                    </tr>
                    {customers.map((customer) =>
                       ( <CustomerDetails key={customer.id} userName={customer.userName} firstName={customer.firstName} lastName={customer.lastName}
                            address={customer.address} phoneNumber={customer.phoneNumber} id={customer.id} />))}
                </table>
                }
                {userType == "COMPANY" && <table>
                    <tr>
                        <th>User name</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Company name</th>
                    </tr>
                    {users.map((user) =>
                        <User key={user.id} userName={user.userName} firstName={user.firstName} lastName={user.lastName}
                            type={user.type} companyName={user.companyName} companyId={user.companyId} id={user.id} />)}
                </table>
                }

            </div>

            <div className='page'>
            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
        </div>
    );
} export default Users