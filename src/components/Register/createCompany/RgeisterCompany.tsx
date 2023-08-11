import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai"
import { FiSmartphone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ActionType } from "../../../redux/action-type";
import axios from 'axios';
import './RegisterCompany.css'



function RegisterCompany() {
    const dispatch = useDispatch();
    let [name, setName] = useState("");
    let [address, setAddress] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");

    function openModal() {
        dispatch({ type: ActionType.modalLogin });
    }
    function towFunctions() {
      
        openModal();
    }



    async function registerClicked() {
        try {
            const response = await axios.post("http://localhost:8080/companies", {

                name,
                address,
                phoneNumber
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
        <div className="Register-company">

            <div className="wrapper">

                <Link to="/"><span className="icon-close" ><IoClose /></span></Link>

                <div className="form-box login">
                    <h2> register</h2>
                    <form action="#">

                        <div className="input-box">
                            <span className="icon"><AiOutlineHome /></span>
                            <input
                                type="text" required

                                onChange={(event) => setName(event.target.value)}

                            />
                            <label> Name</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"><AiOutlineHome /></span>
                            <input
                                type="text" required

                                onChange={(event) => setAddress(event.target.value)}

                            />
                            <label> Address</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><FiSmartphone /></span>
                            <input
                                type="text" required

                                onChange={(event) => setPhoneNumber(event.target.value)}

                            />
                            <label> Phone Number</label>
                        </div>



                        <input type="button" className="btn" value="register" onClick={registerClicked} />

                    </form>
                </div>
            </div>
        </div>
    );
}


export default RegisterCompany