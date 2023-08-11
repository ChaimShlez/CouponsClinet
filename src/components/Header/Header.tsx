import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import ICategoty from "../../models/ICategory";
import Category from "../categories/Category";
import { ActionType } from "../../redux/action-type";
import { Button, Dropdown } from "react-bootstrap";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Register from "../Register/createCustomer/Register";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import Accout from "../acount-panels/Account";
import logo from './logo.png';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
    },
};
Modal.setAppElement('#root');

function Header() {
    const [categories, setCategories] = useState<[ICategoty]>([{ id: 0, name: '' }])
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [openTrigger, setOpenTrigger] = useState(false);
    const [ModalIsRegister, setModalIsRegister] = useState(false);
    let customer = useSelector((state: AppState) => state.customer);
    const user = useSelector((state: AppState) => state.user);
    const modalLoginIsIsOpen = useSelector((state: AppState) => state.modalLoginOpen);
    const modalRegisterIsOpen = useSelector((state: AppState) => state.modalRegisterOpen);


    function isOpenTrigger() {
        setOpenTrigger(true);
    }


    function closeTrigger() {
        setOpenTrigger(false);

    }
    function openModalRegister() {
        dispatch({ type: ActionType.modalRegister });
    }
    function closeModalRegister() {
        dispatch({ type: ActionType.modalRegister });
    }

    function openModalLogin() {
        dispatch({ type: ActionType.modalLogin });
    }


    function closeModalLogin() {
        dispatch({ type: ActionType.modalLogin });
    }

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {

        try {

            let url = `http://localhost:8080/categories`;

            let response = await axios.get(url);
            let categories = response.data;
            setCategories(categories)
            dispatch({ type: ActionType.saveCategories, payload: { categories } });


            console.log(categories);

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

    function clickedCategory(categoryId: number) {
        navigate('/category/' + categoryId)

    }

    function subText(subText: string) {
        dispatch({ type: ActionType.saveSubText, payload: { subText } });

    }


    return (

        <div className="Header">
            <div className="logo">


                <img src={logo} alt="Website Logo" className="website-logo" />
            </div>


            <div className="header-main">
                <div className="buttons">
                    <div className="button-home">
                         {user.userType=="COMPANY " && <button className="btnLink"  >Home</button> }
                        {user.userType == 'ADMIN' && <Link className="link" to="/account/"><button className="btnLink"  >Home</button></Link>}
                        {(user.userType == 'CUSTOMER' || !user.userType) && <Link className="link" to="/"><button className="btnLink"  >Home</button></Link>}
                    </div>

                </div>

                <div className="search">
                    <div className="search-icon"><HiOutlineMagnifyingGlass className="search-icon" />
                    </div>
                    <input type="text" className="search-bar" onChange={event => subText(event.target.value)} />


                </div>

                <div className="drop-down">
                    <div className="name-menu">  categories

                    </div>
                    <div className="drop-down-categories">
                        {categories.map((category) => (<button className="button-categ" onClick={() => clickedCategory(category.id)}>{category.name}  </button>))}

                    </div>

                </div>
            </div>
            <div className="login">


                <div className="hello-customer"> {!user.userType && " Hello Guest "}{user.userType && "Hello" + " " + user.firstName}
                    <span ><IoPersonCircleOutline className="user-icon" /></span>
                    <div className="openTrigger">

                       {(user.userType=="CUSTOMER" || !user.userType) && <div className="buttons-sign">

                            {!user.userType && <button className=" button-sign" onClick={openModalLogin} > <BiLogIn />  Sign in</button>}



                            <Modal isOpen={modalLoginIsIsOpen} onRequestClose={closeModalLogin} style={customStyles}>
                                <Login closeModal={closeModalLogin} />
                            </Modal>


                            <div className="button-sign-up">
                                {!user.userType && <button className=" button-sign" onClick={openModalRegister}><AiOutlineUser />  Sign up</button>}

                                <Modal isOpen={modalRegisterIsOpen} onRequestClose={closeModalRegister} style={customStyles}>
                                    <Register closeModal={closeModalRegister} />
                                </Modal>
                            </div>
                            <div className="buttons-user">
                                {user.userType == "CUSTOMER" || user.userType == 'COMPANY' || user.userType == 'ADMIN' && <button>Log out</button>}
                                {user.userType == "CUSTOMER" && <Link to="/account/customer"> <button className="button-sign">My account</button></Link>}
                            </div>

                        </div>}
                    </div>

                </div>
            </div>
        </div >






    );
} export default Header;
