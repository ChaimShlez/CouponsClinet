
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../Login/Login";
import Register from "../Register/createCustomer/Register";
import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';
import Menu from '../Menu/Menu';

import HomeComponent from '../homePage/HomePage';
import Coupon from '../couponsComponents/ExtendedCoupon';

import HomePage from '../homePage/HomePage';
import ExpenedCoupon from '../couponsComponents/ExtendedCoupon';
import ExpendedCoupon from '../couponsComponents/ExtendedCoupon';
import Customer from '../CustomerComponents/Customer';
import Purchase from '../purchase/Purchases';
import Category from '../categories/Category';
import Edit from '../editComponent/Edit';
import Accout from '../acount-panels/Account';
import Orders from '../orders/Orders';
import ExtendedOrder from '../orders/ExtendedOrder';
import Users from '../users/Users';
import RegisterCompany from '../Register/createCompany/RgeisterCompany';
import CreateCoupon from '../Register/CreateCoupon/CreateCoupon';
import Companies from '../companies/Companies';
import UsersCompany from '../users/Users';
import CreateUser from '../Register/createUser/CreateUser';
import Purchases from '../purchase/Purchases';
import PurchasesCustomer from '../users/PurchasesCustomer';
import CustomersPurchasesByCompany from '../companies/CustomersPurchasesByCompany';
import CouponsByCompany from '../companies/CouponsByCompany';






function Layout() {

    return (


        <section className="Layout">
            <BrowserRouter>
                <header>
                    <Header />
                </header>

                <main>

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                       
                        

                        <Route path="/coupon/:couponId" element={<ExpendedCoupon />} />
                        <Route path="/purchase/:couponId" element={<Purchase />} />
                        <Route path="/category/:categoryId" element={<Category />} />
                       

                        <Route path="/account" element={<Accout />} >
                            <Route path="/account/customer" element={<Customer />} />
                            <Route path="/account/orders" element={<Orders />} />
                            <Route path="/account/orders/:purchaseId" element={<ExtendedOrder />} />
                            
                        </Route>
                        <Route path="/admin" element={<Accout />} >
                            <Route path="/admin/" element={<HomePage />} />
                            <Route path="/admin/getUsers" element={<Users/>} />
                            <Route path="/admin/registerUser" element={<CreateUser/>} />
                            <Route path="/admin/registerCompany" element={<RegisterCompany/>} />
                            <Route path="/admin/getCompanies" element={<Companies/>} />
                            <Route path="/admin/getPurchases" element={<Purchases/>} />
                            <Route path="/admin/purchasesCustomer/:customerId" element={<PurchasesCustomer/>} />
                        </Route>
                        <Route path="/company" element={<Accout />} >
                        <Route path="/company/getPurchases" element={<CustomersPurchasesByCompany />} />
                            <Route path="/company/createCoupon" element={<CreateCoupon />} />
                          
                            <Route path="/company/getCoupons" element={<CouponsByCompany />} />
                          
                           
                        </Route>
                    </Routes> 


                </main>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </section >


    );

} export default Layout