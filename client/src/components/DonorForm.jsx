import React, { useState } from 'react';
import Axios from 'axios';
import "./css/donorForm.css";
import form_clothes from '../assets/form_image2.jpg';

const DonorForm = () => {

    const [formData, setFormData] = useState({
        clothingItems: [
            { type: 'menClothes', selected: false },
            { type: 'womenClothes', selected: false },
            { type: 'blanketsShawls', selected: false },
            {
                type: 'childrenClothes', selected: false, childrenAgeGroups: {
                    '3-5': false,
                    '6-8': false,
                    '9-12': false,
                    '13-15': false,
                    '16-18': false,
                }
            },
            { type: 'other', selected: false, description: '' },
        ],
        season: {
            summer: false,
            winter: false,
            allSeason: false,
        },
        quantity: 0,
        condition: {
            newCondition: false,
            used: false,
            needsMinorRepairs: false,
        },
        specialInstructions: '',
        preferredDay: '',
    });
    const [currentTab, setCurrentTab] = useState(0);
    const [formError, setFormError] = useState('');


    const nextFormStep = () => {
        const { clothingItems, season, quantity, condition, preferredDay } = formData;
        const childrenItem = clothingItems.find(item => item.type === 'childrenClothes');
        const otherItem = clothingItems.find(item => item.type === 'other');
        if (!validateForm() && currentTab === 0) {
            setFormError('Please select atleast one option.');
            return;
        }
        if (!validateForm() && currentTab === 0 && (otherItem.selected && otherItem.description === '')) {
            setFormError('Please provide details.');
            return;
        }
        if (!validateForm() && currentTab === 0 && (childrenItem.selected && !Object.values(childrenItem.childrenAgeGroups).some(val => val))) {
            setFormError('Please select atleast one age group.');
            return;
        }
        if (!validateForm() && currentTab === 1 && !Object.values(season).some(val => val)) {
            setFormError('Please select atleast one season type');
            return;
        }
        if (!validateForm() && currentTab === 1 && parseInt(quantity, 10) <= 0) {
            setFormError('Please provide quantity of clothes');
            return;
        }
        if (!validateForm() && currentTab === 1 && !Object.values(condition).some(val => val)) {
            setFormError('Please select condition of clothes');
            return;
        }
        if (!validateForm() && currentTab === 2 && preferredDay === '') {
            setFormError('Please select preferred day for pickup');
            return;
        }
        
        setFormError('');
        setCurrentTab(prevTab => prevTab + 1);
    }

    const prevFormStep = () => {
        setCurrentTab(prevTab => prevTab - 1);
    }
 
    const handleSubmit = (e) => {
        if (!validateForm() && currentTab === 2) {
            setFormError('Please select a preferred day option');
            return;
        }
        setCurrentTab(prevTab => prevTab + 1);
        e.preventDefault();
        const dataToSend = {
            clothingItems: formData.clothingItems.map(item => ({
                type: item.type,
                selected: item.selected,
                description: item.description,
                childrenAgeGroups: item.childrenAgeGroups // Assuming it's already structured correctly
            })),
            season: {
                summer: formData.season.summer,
                winter: formData.season.winter,
                allSeason: formData.season.allSeason
            },
            quantity: formData.quantity,
            condition: {
                newCondition: formData.condition.newCondition,
                used: formData.condition.used,
                needsMinorRepairs: formData.condition.needsMinorRepairs
            }, // Include your condition data here
            specialInstructions: formData.specialInstructions,
            preferredDay: formData.preferredDay
        };
    
        Axios.post("http://localhost:4000/donate", dataToSend, { withCredentials: true })
            .then(response => {
                console.log(response);
                // Handle success if needed
            })
            .catch(err => {
                console.error(err);
                // Handle error if needed
            });
    }

    const handleCheckboxChange = (index, field) => (e) => {
        const { checked } = e.target;
        setFormData(prevState => {
            const updatedItems = [...prevState[field]];
            updatedItems[index].selected = checked;
            return {
                ...prevState,
                [field]: updatedItems,
            };
        });
        setFormError('');
    };

    const handleAgeGroupChange = (index, ageGroup) => (e) => {
        const { checked } = e.target;
        setFormData(prevState => {
            const updatedItems = [...prevState.clothingItems];
            updatedItems[index].childrenAgeGroups[ageGroup] = checked;
            return {
                ...prevState,
                clothingItems: updatedItems,
            };
        });
        setFormError('');
    };

    const handleChange = (input) => (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        if (name.startsWith('season.') || name.startsWith('condition.')) {
            const [parent, child] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: inputValue,
                },
            }));
        } else if (name.startsWith('clothingItems')) {
            const index = parseInt(name.split('.')[1], 10);
            const field = name.split('.')[2];
            setFormData(prevState => {
                const updatedItems = [...prevState.clothingItems];
                updatedItems[index][field] = inputValue;
                return {
                    ...prevState,
                    clothingItems: updatedItems,
                };
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: inputValue,
            }));
        }
        setFormError('');
    };

    const validateForm = () => {
        const { clothingItems, season, quantity, condition, preferredDay } = formData;
        if (currentTab === 0) {

            const childrenItem = clothingItems.find(item => item.type === 'childrenClothes');
            const otherItem = clothingItems.find(item => item.type === 'other');

            return clothingItems.some(item => item.selected) && 
                   (!otherItem.selected || otherItem.description !== '') &&
                   (!childrenItem.selected || Object.values(childrenItem.childrenAgeGroups).some(val => val));
        }
        if (currentTab === 1) {
            return Object.values(season).some(val => val) && parseInt(quantity, 10) > 0 && Object.values(condition).some(val => val);
        }
        if (currentTab === 2) {
            return preferredDay !== '';
        }
        return true;
    };

    const renderButton = () => {
        if (currentTab === 0) {
            return (
                <div className='button-container'>
                    <button type='button' className="btn nextBtn" onClick={nextFormStep}>Next</button>
                </div>
            );
        }
        if (currentTab === 1) {
            return (
                <div className='button-container'>
                    <button type='button' className="btn prevBtn" onClick={prevFormStep}>Prev</button>
                    <button type='button' className="btn nextBtn" onClick={nextFormStep}>Next</button>
                </div>
            );
        }
        if (currentTab === 2) {
            return (
                <div className='button-container'>
                    <button type='button' className="btn prevBtn" onClick={prevFormStep}>Prev</button>
                    <button type='button' className="btn submitBtn" onClick={handleSubmit}>Submit</button>
                </div>
            );
        }
        return null;
    }

    return (

        <>
        <div className="form-tagline">
        <h2>Please provide details regarding your donation</h2>
        </div>
        
        <div className="main-content">
            <div className="content-image">
                <img src={form_clothes} alt="" className="form-img"/>
            </div>
            <div className='donation-form-container'>
                <form className="donation-form">

                {/* <div className="step-count">{currentTab+1}</div> */}
                {currentTab === 0 && (
                        <div key="step1">
                            <h1>STEP 1</h1>
                            <h2>Provide Clothes Type</h2>
                            <div className="donate-items">
                            {formData.clothingItems.map((item, index) => (
                                <div
                                className={`donate-item ${
                                    index < 3 ? "row-1" : index === 3 ? "row-2" : "row-3"
                                }`}
                                key={index}
                            >
                                    
                                    <label>
                                        <input type="checkbox" checked={item.selected} onChange={handleCheckboxChange(index, 'clothingItems')}/><span>{item.type.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </label>
                                
                                    {item.type === 'childrenClothes' && item.selected && (
                                        <div className='children-age-groups'>
                                            <h3>Select Age Groups</h3>
                                            {Object.keys(item.childrenAgeGroups).map(ageGroup => (
                                                <div className='age-group-item' key={ageGroup}>
                                                    
                                                    <label>
                                                        <input type="checkbox" checked={item.childrenAgeGroups[ageGroup]} onChange={handleAgeGroupChange(index, ageGroup)}/><span>{ageGroup}</span>
                                                    </label>
                                                </div>
                                            ))} 
                                        </div>
                                    )}
                                    {item.type === 'other' && item.selected && (
                                        <div className='other-description'>
                                            <textarea rows={5} cols={97}
                                                name={`clothingItems.${index}.description`}
                                                value={item.description}
                                                placeholder="Please describe"
                                                onChange={handleChange(`clothingItems.${index}.description`)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            </div>
                            {formError && <p className="error">{formError}</p>}

                            
                        </div>
                    )}

                {currentTab === 1 && 
                <div key="step2">
                        <h1>STEP 2</h1>

                        <h2>Select season type</h2>
                            <div className="donate-items">
                            {Object.keys(formData.season).map(season => (
                                <div className='donate-item' key={season}>
                                    <label>
                                        <input type="checkbox" name={`season.${season}`} checked={formData.season[season]} onChange={handleChange(`season.${season}`)}/><span>{season.charAt(0).toUpperCase() + season.slice(1)}</span>
                                    </label>
                                </div>
                            ))}
                            </div>

                        <h2>Provide Quantity</h2>
                        <label>
                            <input type="number" className="quantity" name="quantity" value={formData.quantity} min="0" onChange={handleChange('quantity')}/>
                        </label>
                        

                        <h2>Condition of clothes</h2>
                        <div className="donate-items">
                        {Object.keys(formData.condition).map(condition => (
                                <div className='donate-item' key={condition}>
                                
                                    <label>
                                        <input type="checkbox" name={`condition.${condition}`} checked={formData.condition[condition]} onChange={handleChange(`condition.${condition}`)}/><span>{condition.charAt(0).toUpperCase() + condition.slice(1)}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formError && <p className="error">{formError}</p>} 
                        
                       
                </div>}
                                
                {currentTab === 2 && 
                <div key="step3">
                    <h1>STEP 3</h1>

                <h2>Select Preferred Day for pickup</h2>
                <div className="donate-items">
                <div className='donate-item preferred-days'>
                    <label>
                            <input type="radio" name="preferredDay" value="weekdays" checked={formData.preferredDay === 'weekdays'} onChange={handleChange('preferredDay')}/><span>Weekdays<br></br>
                            Timing: 10am to 4pm</span>
                        </label>
                </div> 
                <div className='donate-item preferred-days'>
                    <label>
                            <input type="radio" name="preferredDay" value="weekends" checked={formData.preferredDay === 'weekends'} onChange={handleChange('preferredDay')}/><span>Weekends<br></br>
                            Timing: 12pm to 5pm</span>
                        </label>
                </div>
                </div>
                {formError && <p className="error">{formError}</p>} 

                <h2>Additional Instructions (if any)</h2>
                <div className="special-inst">
                    <textarea rows={8} cols={97} name="specialInstructions" value={formData.specialInstructions} placeholder="Additional instructions if any" onChange={handleChange('specialInstructions')}/>
                
                </div>
                
                
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
        </div>
        
        </>

        
    );

   
}



export default DonorForm;
