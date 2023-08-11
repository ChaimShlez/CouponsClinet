import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { useState } from "react";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import Modal from 'react-modal';

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
    height: '50%',
    width: '30%',
    },
};
Modal.setAppElement('#root');

function EditCustomer(props:any) {
    const user = useSelector((state: AppState) => state.user);
    const customer = useSelector((state: AppState) => state.customer);
    const id = user.id;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [address, setAddress] = useState(customer.address);
    const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

    


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
            props.closeModal();
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
    } export default EditCustomer