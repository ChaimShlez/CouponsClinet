import axios from 'axios';
import React, { useState } from 'react'
import logo from "./logo.svg";
import './CreateUser.css'
import { IoClose } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import { Outlet, Link } from "react-router-dom";
import { ActionType } from "../../../redux/action-type";
import { useDispatch } from "react-redux";

function CreateUser() {


    const dispatch = useDispatch();
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [address, setAddress] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");

   




    async function registerUserClicked() {
        try {
            const response = await axios.post("http://localhost:8080/users", {

                userName,
                password,
                firstName,
                lastName
            }
            );

            console.log(response);


         

        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("Register invalid,try later")
            }
            debugger
        }
    }
    return (
        <div className="Create-user">

            <div className="wrapper">

                <Link to="/account/"><span className="icon-close" ><IoClose /></span></Link>

                <div className="form-box login">
                    <h2> register</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"><AiOutlineMail /></span>
                            <input
                                type="text" required onChange={(event) => setUserName(event.target.value)}

                            />
                            <label> User name</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><RiLockPasswordLine /></span>
                            <input
                                type="password" required onChange={(event) => setPassword(event.target.value)}



                            />
                            <label> Password</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><AiOutlineUser /></span>
                            <input
                                type="text" required

                                onChange={(event) => setFirstName(event.target.value)}

                            />
                            <label> First Name</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><AiOutlineUser /></span>
                            <input
                                type="text" required

                                onChange={(event) => setLastName(event.target.value)}

                            />
                            <label> Last Name</label>

                        </div >


                        <div className="remember-forgot">
                            <label>
                                {" "}
                                <input type="checkbox" />

                            </label>
                            <a href="#">I agree to the terms & conditions</a>
                        </div>
                        <input type="button" className="btn" value="register" onClick={registerUserClicked} />

                    </form>
                </div>
            </div>
        </div>
    );



} export default CreateUser