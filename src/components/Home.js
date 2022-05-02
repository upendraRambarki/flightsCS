
import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import airplane from "./airplane.svg"
import HomeCard from "./HomeCard";
const Home = () => {
  const [flights,setFlights]=useState([]);
  const [showAdd,setShowAdd]=useState(false);
  const [source,setSource]=useState('');
  const [destination,setDestination]=useState('');
  const [dDate,setDDate]=useState([]);
  function closeFlightModal(){

      setShowAdd(false);
  }
  function showModal(){
      setShowAdd(true);
  }
  useEffect(()=>{
    
    var data={
        "source": source,
        "departDate":dDate,       
        "destination": destination,      
    }
       axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.get("http://localhost:8084/flights/getFlightByfromto/{from}/{to}/{date}"+data).then(res =>res
      ).then((json) => {
      setFlights(json.data);
  }).catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });

},[])

  return (
//     <div>
    
//     <div className="search">
//     <input  required name='source' className='input' placeholder='From' onChange={e=>setSource(e.target.value)}></input>
//     <input  required name='destination' className='input' placeholder='TO' onChange={e=>setDestination(e.target.value)}></input>
//     <input  required type='date' name='date' className='input' placeholder='Date' onChange={e=>setDDate(e.target.value)}></input>
//     <div className="search">
//             <button className="search-button" onClick={showModal}>Search</button>
//             </div>
//     </div> 

// {
    
//    flights.map((entry)=>{
//        return(
//            <HomeCard number={entry.flightNumber}
//            source={entry.source} destination={entry.destination} 
//            arrivaltime={entry.arrivalTime[0]+" "+entry.arrivalTime[1]+" "+entry.arrivalTime[2]}
//             departuretime={entry.departTime[0]+" "+entry.departTime[1]+" "+entry.departTime[2]} 
//             seats= {entry.seatsRemaining} fare={entry.fare} 
//             departuredate={entry.departDate[2]+" "+entry.departDate[1]+ " "+entry.departDate[0]
//         } arrivaldate={entry.arrivalDate[2]+" "+entry.arrivalDate[1]+" "+entry.arrivalDate[0]} traveltime={entry.travelTime} />
//        )
//    })
// }
// </div>
    <div className="home-container">
    <div className="home-search-block">
      <div className="home-search-inputs">
        <input type="text" name="fromText" placeholder="From" />
        <input type="text" name="toText" placeholder="To" />
        <input type="date" name="travelDate" />
        <button type="submit" className="home-check-button">
          Search
        </button>
      </div>
    </div>
  </div>
  );
};

export default Home;
