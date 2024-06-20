import React, { useState } from 'react';
import Axios from 'axios';
import "./css/donorForm.css";

const DonorForm = () => {

    const [formData, setFormData] = useState({
        menClothes: false,
        womenClothes: false,
        childrenClothes: false,
        blanketsShawls: false,
        other: '',
        summer: false,
        winter: false,
        allSeason: false,
        quantity: 0,
        estimatedWeight: '',
        newCondition: false,
        used: false,
        needsMinorRepairs: false,
        specialInstructions: '',
    });
    const [currentTab, setCurrentTab] = useState(0);
    const [formError, setFormError] = useState('');

    const nextFormStep = () => {
        if (!validateForm() && currentTab === 0) {
            setFormError('Please select at least one option.');
            return;
        }
        if (!validateForm() && currentTab === 1) {
            setFormError('*Required');
            return;
        }
        setFormError('');
        setCurrentTab(prevTab => prevTab + 1);
    }

    const prevFormStep = () => {
        setCurrentTab(prevTab => prevTab - 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/donate", {
           
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = (input) => (e) => {
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        setFormError('');
      };

    const validateForm = () => {
        if(currentTab === 0){
            const { menClothes, womenClothes, childrenClothes, blanketsShawls, other, summer, winter, allSeason } = formData;
            return (menClothes || womenClothes || childrenClothes || blanketsShawls || other) && (summer || winter || allSeason);
        }
        if(currentTab === 1){
            const { quantity, estimatedWeight, newCondition, used, needsMinorRepairs, specialInstructions } = formData;
            return (quantity && estimatedWeight && (newCondition || used || needsMinorRepairs));
        }
        
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
                    <button type='button' className="btn nextBtn" onClick={nextFormStep}>Next</button>
                </div>
            );
        }
        if (currentTab === 2) {
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
        <div className='donation-form-container'>
            <form className="donation-form">

                {currentTab === 0 && 
                <div key="step1">
                    <h2>Step 1: Select Clothes Type and Season</h2>
                    <div className='donate-item-info'>
                    <label htmlFor='menClothes'>Men Clothes</label>
                    <input type="checkbox" className='custom-checkbox' checked={formData.menClothes} name="menClothes" onChange={handleChange('menClothes')}/>
                    </div>
                    
                    <div className='donate-item-info'>
                    <label htmlFor='menClothes'>Women Clothes
                    </label>
                        <input type="checkbox" className='custom-checkbox' name="womenClothes" checked={formData.womenClothes} onChange={handleChange('womenClothes')}/>
                    </div>
                   
                    <div className='donate-item-info'>
                    <label htmlFor='childrenClothes'>Children Clothes
                    </label>
                        <input type="checkbox" className='custom-checkbox' name="childrenClothes" checked={formData.childrenClothes} onChange={handleChange('childrenClothes')}/>
                    </div>    
                    
                    <div className='donate-item-info'>
                    <label htmlFor='blanketsShawls'>Blankets/Shawls
                    </label>
                        <input type="checkbox" className='custom-checkbox' name="blanketsShawls" checked={formData.blanketsShawls} onChange={handleChange('blanketsShawls')} />
                    </div>    
                    
                    <div className='donate-item-info'>
                    <label htmlFor='other'>Other:</label>
                    <textarea name="other" value={formData.other} placeholder="Other" onChange={handleChange('other')}/>
                    </div>  
                    {formError && <p className="error">{formError}</p>} 
                    
                    <h2>Select season type</h2>
                    <div className='donate-item-info'>
                    <label htmlFor='summer'>Summer
                    </label>
                    <input type="checkbox" className='custom-checkbox' name="summer" checked={formData.summer} onChange={handleChange('summer')}/>
                    </div>
                    
                    <div className='donate-item-info'>
                    <label htmlFor='winter'>Winter
                    </label>
                        <input type="checkbox" className='custom-checkbox' name="winter" checked={formData.winter} onChange={handleChange('winter')}/>
                    </div>
                    
                    <div className='donate-item-info'>
                    <label htmlFor='allSeason'>All season</label>
                        <input type="checkbox" className='custom-checkbox' name="allSeason" checked={formData.allSeason} onChange={handleChange('allSeason')}/>
                    </div> 
                    {formError && <p className="error">{formError}</p>}                 
                </div> 
                }

                {currentTab === 1 && 
                <div key="step2">
                    <h2>Step 2: Provide Quantity and Condition</h2>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={formData.quantity} min="0" onChange={handleChange('quantity')}/>
                    </label>
                    {formError && <p className="error">{formError}</p>} 
                    <label>
                        Estimated Weight:
                        <input type="text" name="estimatedWeight" value={formData.estimatedWeight} onChange={handleChange('estimatedWeight')}/>
                    </label>
                    {formError && <p className="error">{formError}</p>} 
                    <div>
                        <div className='donate-item-info'>
                        <label htmlFor='newCondition'>New</label>
                        <input type="checkbox" className='custom-checkbox' name="newCondition" checked={formData.newCondition} onChange={handleChange('newCondition')}/>
                        </div>
                        
                        <div className='donate-item-info'>
                        <label htmlFor='used'>Used</label>
                        <input type="checkbox" className='custom-checkbox' name="used" checked={formData.used} onChange={handleChange('used')}/>
                        </div>
                        
                        <div className='donate-item-info'>
                        <label htmlFor='needsMinorRepairs'>Needs Minor Repairs</label>
                        <input type="checkbox" className='custom-checkbox' name="needsMinorRepairs" checked={formData.needsMinorRepairs} onChange={handleChange('needsMinorRepairs')}/>
                        </div>
                        
                        
                    </div>
                    <textarea name="specialInstructions" value={formData.specialInstructions} placeholder="Special instructions if any" onChange={handleChange('specialInstructions')}/>
                    {formError && <p className="error">{formError}</p>} 
                </div>}
                
                
            {currentTab === 2 && 
                <div key="step3">
                <h2>Step 3: Select Preferred Date and Time</h2>
                <label>
                    Preferred Date:
                    <input type="date" name="preferredDate" value={formData.preferredDate} />
                </label>
                <label>
                    Preferred Time:
                    <input type="time" name="preferredTime" value={formData.preferredTime}/>
                </label>
            </div>}

            {currentTab === 3 && 
                <div key="step4">
                <h2>Thank you!</h2>
                <h4>We appreciate your effort towards donating for the greater good!<br/>
                The NGOs will contact you soon!
                </h4>
            </div>}

            <div className="button-container">
                    {renderButton()}
            </div>

            </form>
        </div>
    );
}

export default DonorForm;
