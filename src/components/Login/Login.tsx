import logo from "./logo.svg";
import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
//import { } from 'react-icons/fa';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import Modal from "react-modal";
import { Link, useNavigate } from 'react-router-dom';
import ISuccessfulLoginData from "../../models/ISuccessfulLoginData";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";


function Login(props: any) {

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);

    function openModal() {
        dispatch({ type: ActionType.modalRegister });
    }
    function towFunctions(){
        props.closeModal();
        openModal();
    }

    async function loginClicked() {
        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                userName,
                password
            });
            console.log(response);
            let token = response.data;
            console.log(token)
            localStorage.setItem('token', token);
            let decodedToken: any = jwt_decode(token);
            let strSuccessfulLoginData: string = decodedToken.sub;

            let successfulLoginData: ISuccessfulLoginData = JSON.parse(strSuccessfulLoginData)
           
           let str = localStorage.getItem("userDetails");

           
            dispatch({ type: ActionType.saveUser, payload: { successfulLoginData } });

            console.log(successfulLoginData)
            axios.defaults.headers.common['Authorization'] = token;

         
            props.closeModal();

            if(successfulLoginData.userType==='ADMIN'){
                navigate('/admin/')
            }
            else if(successfulLoginData.userType==='COMPANY'){
                navigate('/company/getPurchases')
            }
        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("Login invalid,try later")
            }
        }
    } return (

        <div className="Login">
            <div className="wrapper">
                <span className="icon-close" onClick={() => props.closeModal()} ><IoClose /></span>
                <div className="form-box login">
                    <h2> login</h2>
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
                                type="password" required

                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <label> Password</label>
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />
                                remember me
                            </label>
                            <a href="#">forgot password?</a>
                        </div>
                        <input type="button" className="btn" value="login" onClick={loginClicked} />
                        <div className="login-register">
                            <p>Don't have an account?

                                
                                <div className="link" onClick={() => towFunctions()} >Register</div>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}

export default Login;