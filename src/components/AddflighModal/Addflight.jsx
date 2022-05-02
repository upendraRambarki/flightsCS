import axios from 'axios';
import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import './Addflight.css';

const Addflight = ({closeModal}) => {
    const [number,setNumber]=useState('');
    const [source,setSource]=useState('');
    const [destination,setDestination]=useState('');
    const [aTime,setATime]=useState('');
    const [dTime,setDTime]=useState('');
    const [dDate,setDDate]=useState([]);
    const [aDate,setADate]=useState([]);
    const [seats,setSeats]=useState(0);
    const [cost,setCost]=useState(0.0);
    const [tTime,setTTime]=useState('');
    const [saved,setSaved]=useState(false);
    function addFlight(event){
        event.preventDefault();
        var data={
            "flightNumber": number,
            "source": source,
            "departDate":dDate,
            "departTime": dTime,
            "destination": destination,
            "arrivalDate": aDate,
            "arrivalTime": aTime,
            "travelTime": tTime,
            "fare": cost,
            "seatsRemaining": seats
        }
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*' },
            body: JSON.stringify(data)
        };
        axios.post("http://localhost:8084/flights/addFlights",requestOptions).then(response => {
            if (response.status === 200) { setSaved(true);
            console.log(saved); }
        }).catch(error => {
            
            console.error('There was an error!',error);
        });
    }
    
    return ReactDOM.createPortal(
        <div  className='modal-overlay' onClick={closeModal}>
            <div
                onClick={(e) => e.stopPropagation()}
                className='modal-container'
            >
                <div className='upper-section'>
                    <h1>Add Flights</h1>
                    <p  className='close'  onClick={closeModal}>
                        &times;
                    </p>
                </div>
                <div className='middle-section'>
                    <form>
                        <div className='section1'>
                    <input type="text" required name='flightNumber' className='input' placeholder='Flight Number' onChange={e=>setNumber(e.target.value)}></input>
                    <input  required name='source' className='input' placeholder='From' onChange={e=>setSource(e.target.value)}></input>
                    <input  required name='destination' className='input' placeholder='TO' onChange={e=>setDestination(e.target.value)}></input>
                    <input required type='time' name="arrivalTime" className='input' onChange={e=>setATime(e.target.value)}></input>
                    <input required type='time' name="departureTime" className='input' onChange={e=>setDTime(e.target.value)}></input>
                        </div>
                        
                       
                        <div className='section2'>
                            <input required type='date' name="arrivalDate" className='input' onChange={e=>
                            { var str=e.target.value;
                                var l=str.split("/").map(i=>parseInt(i,10));
                                setADate(l)}}></input>
                            <input required type='date' name="departureDate" className='input' onChange={e=>
                                { var str=e.target.value;
                                 var l=str.split("/").map(i=>parseInt(i,10));
                                 setDDate(l)}}></input>
                            <input required type="text" name="availableSeats" className='input' placeholder='Seats Available' onChange={e=>setSeats(e.target.value)}></input>
                            <input required type="text" name="cost" className='input' placeholder='Cost' onChange={e=>setCost(e.target.value)}></input>
                            <input required type="text" name="travelTime" className='input' placeholder='travelTime' onChange={e=>setTTime(e.target.value)}></input>
                        </div>

                    </form>
                </div>
                <div className='lower-section'>
                    <button  className='modal-btn btn-red'  onClick={closeModal}>
                        Cancel
                    </button>
                    <a
                        
                        className='modal-btn btn-green' onClick={addFlight}
                    >
                        Add Flight 
                    </a>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Addflight;