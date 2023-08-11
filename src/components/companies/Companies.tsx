import axios from 'axios';
import Raact, { useEffect, useState } from 'react'
import { ICompany } from '../../models/ICompany';
import Company from './Company';
import './Companies.css';
import CreateCoupon from '../Register/CreateCoupon/CreateCoupon';

function Companies() {
    const [companies, setCompanies] = useState<[ICompany]>([{ id: 0, name: "", address: "", phoneNumber: "" }])
    let [pageNumber, setPageNumber] = useState(1);



    useEffect(() => {
        getAllCompanies(pageNumber);
    }, [pageNumber]);

    function onNextClicked() {
        pageNumber++;
        setPageNumber(pageNumber);
    }

    function onBackClicked() {
        pageNumber--;
        setPageNumber(pageNumber);
    }

    async function getAllCompanies(pageNumber: number) {

        try {

            let url = `http://localhost:8080/companies?pageNumber=${pageNumber}`;

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
                alert("Get all companies invalid,try later")
            }
        }
    }

    return (
        <div className='Companies'>
            <div className='companies-container'>
                <table>

                    <tr>
                        <th> name</th>
                        <th> address</th>
                        <th>phone number</th>

                    </tr>
                    {companies.map((company) =>
                        <Company key={company.id} name={company.name} address={company.address} phoneNumber={company.phoneNumber}
                            id={company.id} />)}
                </table>

            </div>

            <div className='page'>
                <input type="button" disabled={pageNumber == 1} value="back" onClick={() => onBackClicked()} />
                <input type="button" value="next" onClick={() => onNextClicked()} />
            </div>
        </div>
    );
} export default Companies