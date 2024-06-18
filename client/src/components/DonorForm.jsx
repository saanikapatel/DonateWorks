import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';


const DonorForm = () => {

    const [items, setItems] = useState({
        clothes: false,
        blankets: false,
        woollenClothes: false,
    });
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [currentTab, setCurrentTab] = useState(0);

    const nextFormStep = () => {
        setCurrentTab(prevTab => prevTab + 1);
    }

    const prevFormStep = () => {
        setCurrentTab(prevTab => prevTab - 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/donate", {
            name,
            address,
            phone
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setItems((prevItems) => ({
            ...prevItems,
            [name]: checked,
        }));
    };

    const renderButton = () => {
        if (currentTab === 0) {
            return (
                <div>
                    <button type='button' className="btn nextBtn" onClick={nextFormStep}>Next</button>
                </div>
            );
        }
        if (currentTab === 1) {
            return (
                <div>
                    <button type='button' className="btn prevBtn" onClick={prevFormStep}>Prev</button>
                    <button type='button' className="btn submitBtn" onClick={handleSubmit}>Submit</button>
                </div>
            );
        }
        return null;
    }


    return (
        <div className='sign-up-container'>
            <form className="sign-up-form">

                {currentTab === 0 && 
                <div key="step1">
                    <h2>What do you want to donate?</h2>
                    <input type='checkbox' name='clothes' checked={items.clothes} onChange={handleCheckboxChange}></input>
                    <label htmlFor='clothes'>Clothes</label>
                    <input type='checkbox' name='blankets' checked={items.blankets} onChange={handleCheckboxChange}></input>
                    <label htmlFor='blankets'>Blankets</label>
                    <input type='checkbox' name='woollenClothes' checked={items.woollenClothes} onChange={handleCheckboxChange}></input>
                    <label htmlFor='woollenClothes'>Woollen clothes</label>

                </div>}

                {currentTab === 1 && 
                <div key="step2">
                    <h2>Please provide your details</h2>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="address">Address:</label>
                    <textarea id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

                    <label htmlFor="phone">Phone no:</label>
                    <input type="text" id="phone" placeholder="Phone No." onChange={(e) => setPhone(e.target.value)} />
                </div>}
                
                
            {currentTab === 2 && 
                <div key="step3">
                Thanks
            </div>}

            <div className="button-container">
                    {renderButton()}
                </div>


            </form>
        </div>
    );
}

export default DonorForm;
