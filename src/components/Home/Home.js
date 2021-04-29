import React, { useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setvehicles] = useState(fakeData);
    return (
       <div className="home">
            <div className="row">
                {
                    vehicles.map(data => <Vehicle vehicle={data} key={data.id}></Vehicle>)
                }
            </div>
        </div>    
    );
};

export default Home;