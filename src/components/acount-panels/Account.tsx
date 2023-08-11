import React, { useEffect, useState } from 'react';
import './Account.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Customer from '../CustomerComponents/Customer';
import Modal from 'react-modal';
import CreateCoupon from '../Register/CreateCoupon/CreateCoupon';

const customStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        borderRadius: '10px',
        border: '2px solid rgb(197, 168, 189)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 35px rgb(210, 187, 198)',

    },
};
Modal.setAppElement('#root');



function Accout() {
    const userType = useSelector((state: AppState) => state.user.userType);
    const location = useLocation();
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true)
    }
    function closeModal() {
        setModalIsOpen(false)
    }




    ;
    return (
        <div className='Account'>
            <div className='main-account'>
                <div className='account-contianer'>

                  {userType=="CUSTOMER" && <h4>My account</h4>}  

                    <div className='account-menu' >

                        {userType == 'CUSTOMER' &&  <Link to="/account/customer">
                            <button className={location.pathname === "/account/customer" ? 'button-active' : 'button'} >edit personal detils</button>
                        </Link>}
                        {userType == "CUSTOMER" && <Link to="/account/orders">
                            <button className={location.pathname === '/account/orders' ? 'button-active' : 'button'}>My orders</button>
                        </Link>}
                        {userType == "ADMIN" &&  <Link to="/admin/">
                            <button className={location.pathname === "/admin/" ? 'button-active' : 'button'}>edit coupon detils</button>
                        </Link>}
                        {userType == "ADMIN" && <Link to="/admin/registerUser">
                            <button className={location.pathname === "/admin/registerUser" ? 'button-active' : 'button'}>add user</button>
                        </Link>}
                        {userType == "ADMIN" && <Link to="/admin/getUsers">
                            <button className={location.pathname === "/admin/getUsers" ? 'button-active' : 'button'}>get users</button>
                        </Link>}
                        {userType == "ADMIN" &&<Link to="/admin/RegisterCompany">
                            <button className={location.pathname === "/admin/RegisterCompany" ? 'button-active' : 'button'}>Add company</button>
                        </Link>}
                        {userType == "ADMIN" &&  <Link to="/admin/getCompanies">
                            <button className={location.pathname === "/admin/getCompanies" ? 'button-active' : 'button'}>Get companies</button>
                        </Link>}
                        {userType == "ADMIN" && <Link to="/admin/getPurchases">
                            <button className={location.pathname === "/admin/getPurchases" ? 'button-active' : 'button'}>Get purchases</button>
                        </Link>}
                        {userType == "COMPANY" && <Link to="/company/getPurchases">
                            <button className={location.pathname === "/company/getPurchases" ? 'button-active' : 'button'}>Get purchases</button>
                        </Link>}
                        {userType == "COMPANY" &&<Link to="/company/getCoupons">
                            <button className={location.pathname === "/company/getCoupons" ? 'button-active' : 'button'}>Get coupons</button>
                        </Link>}
                        {userType == "COMPANY" && <Link to="/company/getCustomers">
                            <button className={location.pathname === "/company/getCustomers" ? 'button-active' : 'button'}>get customers</button>
                        </Link>}
                        {userType == "COMPANY" && <Link to="/company/createCoupon">
                            <button className={location.pathname === "/company/createCoupon" ? 'button-active' : 'button'}>Add coupon</button>
                        </Link>}
                       

                        


                    </div>
                </div>
                <div className='display-customer'>

                    <Outlet />
                </div>
            </div>
        </div>



    );
} export default Accout;