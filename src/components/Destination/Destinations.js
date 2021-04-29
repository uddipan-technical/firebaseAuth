import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import fakeData from '../../fakeData/fakeData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';


const Destinations = () => {
    const [location, setLocation] = useState({
        from: "",
        to: "",
        date: "",
        isSearch: false
    });
    const {vehicle} = useParams();
   
    const searchChangeHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newLocation = {...location};
        newLocation[name] = value;
        setLocation(newLocation);
    }
    const searchHandle = (e) => {

        const data =( vehicle === "destination") ? fakeData.find(ele => ele.type === "Car") : fakeData.find(ele => ele.type === vehicle);
        const newLocation = {...location};
        newLocation.img = data.img;
        newLocation.vehicle = data.type;
        newLocation.price = data.price;
        newLocation.isSearch = true;
        setLocation(newLocation);
        e.preventDefault();
    }

    return (
        <div className="destination">
            <div className="row">
                <div className="col-md-4">
                    <div className="location-input">
                        {
                            location.isSearch ?
                            <div className="search-location">
                                <div className="location">
                                    <p>{location.from}</p>
                                    <p>{location.to}</p>
                                </div>
                                <div className="transport">
                                    <li><img src={location.img} alt={location.vehicle} width="40"/>  {location.vehicle}</li>
                                    <li><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> 4</li>
                                    <li>${location.price}</li>
                                    <li>{location.date}</li>
                                </div>
                                <div className="transport">
                                    <li><img src={location.img} alt={location.vehicle} width="40"/>  {location.vehicle}</li>
                                    <li><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> 4</li>
                                    <li>${location.price}</li>
                                    <li>{location.date}</li>
                                </div>
                                <div className="transport">
                                    <li><img src={location.img} alt={location.vehicle} width="40"/>  {location.vehicle}</li>
                                    <li><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> 4</li>
                                    <li>${location.price}</li>
                                    <li>{location.date}</li>
                                </div>
                            </div>
                            :
                            <form onSubmit={searchHandle}>
                            <div className="form-group">
                                <label htmlFor="from">Pick From</label>
                                <input type="text" className="form-control" onChange={searchChangeHandle} name="from" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="to">Pick To</label>
                                <input type="text" className="form-control" onChange={searchChangeHandle} name="to" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Pick Date</label>
                                <input type="date" className="form-control" onChange={searchChangeHandle} name="date" required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-warning btn-block" value="Search"/>
                            </div>
                        </form>
                        }
                    </div>
                </div>
                <div className="col-md-8">
                       <div className="location-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235638.86347711584!2d92.05023731624908!3d22.659110667157076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752b4fac1b4bb9f%3A0x6e12cde7c14a35fe!2z4Kaw4Ka-4KaZ4KeN4KaX4Ka-4Kau4Ka-4Kaf4Ka_IOCmuOCmpuCmsCDgpongpqrgppzgp4fgprLgpr4!5e0!3m2!1sbn!2sbd!4v1616118814990!5m2!1sbn!2sbd" width="100%" height="450" style={{border: '0'}}  allowFullScreen="" loading="lazy"></iframe>
                        </div> 
                </div>
            </div>
        </div>
    );
};

export default Destinations;