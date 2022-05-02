
import axios from "axios";
import React, { useState, useEffect } from "react";
import Addflight from "../AddflighModal/Addflight";
import FlightCard from "./FlightCard";

const ManageFlights=()=>{
    const [flights,setFlights]=useState([]);
    const [showAdd,setShowAdd]=useState(false);
    function closeFlightModal(){
        setShowAdd(false);
    }
    function showModal(){
        setShowAdd(true);
    }
    useEffect(()=>{
         axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get("http://localhost:8084/flights/getFlights").then(res =>res
        ).then((json) => {
        setFlights(json.data);
    }).catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });

},[])
    return(
        
        <div>
            {showAdd && <Addflight closeModal={closeFlightModal}/>}
            <div className="add">
            <button className="add-button" onClick={showModal}>Add</button>
            </div>
            
            
        {
            
           flights.map((entry)=>{
               return(
                   <FlightCard number={entry.flightNumber} key={entry.flightNumber}
                   source={entry.source} destination={entry.destination} 
                   arrivaltime={entry.arrivalTime[0]+" "+entry.arrivalTime[1]+" "+entry.arrivalTime[2]}
                    departuretime={entry.departTime[0]+" "+entry.departTime[1]+" "+entry.departTime[2]} 
                    seats= {entry.seatsRemaining} fare={entry.fare} 
                    departuredate={entry.departDate[2]+" "+entry.departDate[1]+ " "+entry.departDate[0]
                } arrivaldate={entry.arrivalDate[2]+" "+entry.arrivalDate[1]+" "+entry.arrivalDate[0]} traveltime={entry.travelTime} />
               )
           })
        }
        </div>
    )
}
export default ManageFlights;
