import React, { useState } from 'react';
import Axios from 'axios';
import "./css/donorForm.css";

const DonorForm = () => {

    const [formData, setFormData] = useState({
        clothingItems: [
            { type: 'menClothes', selected: false },
            { type: 'womenClothes', selected: false },
            {
                type: 'childrenClothes', selected: false, childrenAgeGroups: {
                    '3-5': false,
                    '6-8': false,
                    '9-12': false,
                    '13-15': false,
                    '16-18': false,
                }
            },
            { type: 'blanketsShawls', selected: false },
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
        const dataToSend = {
            clothingItems: formData.clothingItems.map(item => ({
                type: item.type,
                selected: item.selected,
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
    
        Axios.post("http://localhost:4000/donate", dataToSend)
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
        const { clothingItems, season, quantity, condition } = formData;
        if (currentTab === 0) {
            const childrenItem = clothingItems.find(item => item.type === 'childrenClothes');
            return clothingItems.some(item => item.selected) &&
                   Object.values(season).some(val => val) &&
                   (!childrenItem.selected || Object.values(childrenItem.childrenAgeGroups).some(val => val));
        }
        if (currentTab === 1) {
            return parseInt(quantity, 10) > 0 && Object.values(condition).some(val => val);
        }
        return true;
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

            {currentTab === 0 && (
                    <div key="step1">
                        <h2>Step 1: Select Clothes Type and Season</h2>
                        {formData.clothingItems.map((item, index) => (
                            <div className='donate-item-info' key={item.type}>
                                <label htmlFor={item.type}>{item.type.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <input
                                    type="checkbox"
                                    className='custom-checkbox'
                                    checked={item.selected}
                                    onChange={handleCheckboxChange(index, 'clothingItems')}
                                />
                                {item.type === 'childrenClothes' && item.selected && (
                                    <div className='children-age-groups'>
                                        <h3>Select Age Groups</h3>
                                        {Object.keys(item.childrenAgeGroups).map(ageGroup => (
                                            <div className='donate-item-info' key={ageGroup}>
                                                <label htmlFor={ageGroup}>{ageGroup}</label>
                                                <input
                                                    type="checkbox"
                                                    className='custom-checkbox'
                                                    checked={item.childrenAgeGroups[ageGroup]}
                                                    onChange={handleAgeGroupChange(index, ageGroup)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {item.type === 'other' && item.selected && (
                                    <div className='donate-item-info'>
                                        <label htmlFor='other'>Description:</label>
                                        <textarea
                                            name={`clothingItems.${index}.description`}
                                            value={item.description}
                                            placeholder="Please describe"
                                            onChange={handleChange(`clothingItems.${index}.description`)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        {formError && <p className="error">{formError}</p>}
                        <h2>Select season type</h2>
                        {Object.keys(formData.season).map(season => (
                            <div className='donate-item-info' key={season}>
                                <label htmlFor={season}>{season.charAt(0).toUpperCase() + season.slice(1)}</label>
                                <input
                                    type="checkbox"
                                    className='custom-checkbox'
                                    name={`season.${season}`}
                                    checked={formData.season[season]}
                                    onChange={handleChange(`season.${season}`)}
                                />
                            </div>
                        ))}
                        {formError && <p className="error">{formError}</p>}
                    </div>
                )}

                {currentTab === 1 && 
                <div key="step2">
                    <h2>Step 2: Provide Quantity and Condition</h2>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={formData.quantity} min="0" onChange={handleChange('quantity')}/>
                    </label>
                    {formError && <p className="error">{formError}</p>} 
                    
                    {/* <div> */}

                    {Object.keys(formData.condition).map(condition => (
                            <div className='donate-item-info' key={condition}>
                                <label htmlFor={condition}>{condition.charAt(0).toUpperCase() + condition.slice(1)}</label>
                                <input
                                    type="checkbox"
                                    className='custom-checkbox'
                                    name={`condition.${condition}`}
                                    checked={formData.condition[condition]}
                                    onChange={handleChange(`condition.${condition}`)}
                                />
                            </div>
                        ))}
                        {/* <div className='donate-item-info'>
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
                         */}
                        
                    {/* </div> */}
                    <textarea name="specialInstructions" value={formData.specialInstructions} placeholder="Special instructions if any" onChange={handleChange('specialInstructions')}/>
                    {formError && <p className="error">{formError}</p>} 
                </div>}
                
                
            {currentTab === 2 && 
               <div key="step3">
               <h2>Step 3: Select Preferred Day</h2>
               <div className='donate-item-info'>
                   <label>
                       <input
                           type="radio"
                           name="preferredDay"
                           value="weekdays"
                           checked={formData.preferredDay === 'weekdays'}
                           onChange={handleChange('preferredDay')}
                       />
                       Weekdays<br></br>
                       Timing: 10am to 4pm
                   </label>
               </div>
               <div className='donate-item-info'>
                   <label>
                       <input
                           type="radio"
                           name="preferredDay"
                           value="weekends"
                           checked={formData.preferredDay === 'weekends'}
                           onChange={handleChange('preferredDay')}
                       />
                       Weekends
                   </label>
               </div>
           </div>
}

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
