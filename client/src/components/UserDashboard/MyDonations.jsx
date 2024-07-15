import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

const MyDonations = () => {
  const { token } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user-donations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching donations');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDonations();
    } else {
      setLoading(false);
      setError('No token found');
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className='donations-card-container'>
      <div>
        <h1>My Donations</h1>
        <ul>
          {donations.map((donation) => (
            <li key={donation._id} className='each-card'>
              <h4>Clothing Items: </h4>
              {donation.clothingItems.filter(item =>
                item.selected &&
                (item.type === 'menClothes' || item.type === 'womenClothes' || item.type === 'blanketsShawls')
              ).length > 0 && (
                  <div className='clothing-items'>
                    {donation.clothingItems.filter(item =>
                      item.selected &&
                      (item.type === 'menClothes' || item.type === 'womenClothes' || item.type === 'blanketsShawls')
                    ).map(item => (
                      <span key={item.type} className='clothing-item'>
                        <span className='first-row'>{item.type}</span>
                      </span>
                    ))}
                  </div>
                )}

              {donation.clothingItems.filter(item =>
                item.selected &&
                item.type === 'childrenClothes'
              ).length > 0 && (
                  <div className='clothing-items'>
                    {donation.clothingItems.filter(item =>
                      item.selected &&
                      item.type === 'childrenClothes'
                    ).map(item => (
                      <span key={item.type} className='clothing-item'>
                        <span className='first-row'>{item.type}</span>
                        {item.childrenAgeGroups && (
                          <span>
                            {Object.keys(item.childrenAgeGroups)
                              .filter(key => key !== '_id')
                              .map(group => (
                                item.childrenAgeGroups[group] && (
                                  <span key={group} className='age-group'>
                                    {group}
                                  </span>
                                )
                              ))}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

              {donation.clothingItems.filter(item =>
                item.selected &&
                item.type !== 'menClothes' &&
                item.type !== 'womenClothes' &&
                item.type !== 'blanketsShawls' &&
                item.type !== 'childrenClothes'
              ).length > 0 && (
                  <div className='clothing-items'>
                    {donation.clothingItems.filter(item =>
                      item.selected &&
                      item.type !== 'menClothes' &&
                      item.type !== 'womenClothes' &&
                      item.type !== 'blanketsShawls' &&
                      item.type !== 'childrenClothes'
                    ).map(item => (
                      <span key={item.type} className='clothing-item'>
                        <span className='first-row'>{item.type}</span>
                        {item.description && (
                          <span className='rendered-desc'>{item.description}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}


              <div className="row">
                <span><b>Quantity: </b></span>
                <span>{donation.quantity}</span>
              </div>

              {Object.values(donation.season).some(value => value) && (
        <div className='clothing-items'>
          <span><b>Season:</b></span>
          {Object.keys(donation.season).filter(key => donation.season[key]).map(key => (
            <span key={key} className='first-row'>{key}</span>
          ))}
        </div>
      )}

        {Object.values(donation.condition).some(value => value) && (
                <div className='clothing-items'>
                  <span><b>Condition:</b></span>
                  {Object.keys(donation.condition).filter(key => donation.condition[key]).map(key => (
                    <span key={key} className='first-row'>{key}</span>
                  ))}
                </div>
              )}

              <div className="clothing-items">
              <p><b>Preferred Day: </b>{donation.preferredDay}</p>
              {donation.specialInstructions && (
                <>
                  <span><b>Special Instructions:</b></span>
                  <span className='rendered-desc'>{donation.specialInstructions}</span>
                </>
              )}
              </div>
              
              <div className="clothing-items">
              <span><b>Created At: </b>{donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'N/A'}</span>
              {donation.createdAt && (
                <span>, {new Date(donation.createdAt).toLocaleDateString('en-US', { weekday: 'long' })}</span>
              )}
              </div>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MyDonations
