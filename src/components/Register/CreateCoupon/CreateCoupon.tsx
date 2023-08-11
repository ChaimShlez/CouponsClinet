import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiCoupon3Line } from "react-icons/ri";
import { ActionType } from "../../../redux/action-type";
import { useDispatch, useSelector } from "react-redux";
import { BsCalendarDate, BsCardImage } from "react-icons/bs";
import { IoPricetagOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import './CreateCoupon.css';
import { AppState } from "../../../redux/app-state";
import { ICompany } from "../../../models/ICompany";



function CreateCoupon() {
    const dispatch = useDispatch();
    let [name, setName] = useState("");
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [imgUrl, setImgUrl] = useState("");
    let [categoryId, setCategoryID] = useState(0);
    let [comanyId, setCompanyId] = useState(0);
    const [companies, setCompanies] = useState<[ICompany]>([{ id: 0, name: "", address: "", phoneNumber: ""}])
    let categories = useSelector((state: AppState) => state.categories);
      
    useEffect(() => {
        getCompanies();
    }, []);
    async function getCompanies() {

        try {

            let url = `http://localhost:8080/companies`;

            let response = await axios.get(url);
            let companies = response.data;
            debugger
          setCompanies(companies)
         
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("create coupon invalid,try later")
            }
            debugger
        }
    }

    const handleCategorySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const selectedCategory = +event.target.value;
        setCategoryID(selectedCategory);
      };
      const handleCompanySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const selectedCompany = +event.target.value;
       setCompanyId(selectedCompany)
      };
      

    function openModal() {
        dispatch({ type: ActionType.modalLogin });
    }
    function towFunctions() {

        openModal();
    }



    async function registerClicked() {
        try {
            const response = await axios.post("http://localhost:8080/coupons", {

                name,
                price,
                description,
                startDate,
                endDate,
                imgUrl,
                category:{
                    id:categoryId
                    },
                    company:{
                      id:comanyId
                    }
            }
            );
            
            console.log(response);




        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("create coupon invalid,try later")
            }
            debugger
        }
    }
    return (
        <div className="create-coupon">

            <div className="wrapper">

            <Link to="/"><span className="icon-close" ><IoClose /></span></Link>

                <div className="form-box login">
                    <h2> create coupon</h2>
                    <form action="#">

                        <div className="input-box">
                            <span className="icon"><RiCoupon3Line /></span>
                            <input
                                type="text" required

                                onChange={(event) => setName(event.target.value)}

                            />
                            <label> Name</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"><IoPricetagOutline /></span>
                            <input
                                type="text" required

                                onChange={(event) => setPrice(event.target.value)}

                            />
                            <label> Price</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><TbFileDescription /></span>
                            <input
                                type="text" required

                                onChange={(event) => setDescription(event.target.value)}

                            />
                            <label> Descriptionr</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><BsCalendarDate /></span>
                            <input
                                type="text" required

                                onChange={(event) => setStartDate(event.target.value)}

                            />
                            <label> Srart date</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><BsCalendarDate /></span>
                            <input
                                type="text" required

                                onChange={(event) => setEndDate(event.target.value)}

                            />
                            <label> End date</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><BsCardImage /></span>
                            <input
                                type="text" required

                                onChange={(event) => setImgUrl(event.target.value)}

                            />
                            <label> Image</label>
                        </div>
                        <div className="input-box">
                            <select
                                id="comanies"
               
                                onChange={handleCategorySelectChange}
                            >
                                {companies.map((company) => (<option value={company.id}>{company.name}</option>))}
                            </select>
                        </div>

                        <div className="input-box">
                            <select
                                id="categories"
               
                                onChange={handleCategorySelectChange}
                            >
                                {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                            </select>
                        </div>



                        <input type="button" className="btn" value="register" onClick={registerClicked} />

                    </form>
                </div>
            </div>
        </div>
    );
}


export default CreateCoupon