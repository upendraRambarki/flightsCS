import react from "react";
import './HomeFlights.css';

const HomeCard=({number,source,destination,arrivaltime,departuretime,seats,fare,arrivaldate,departuredate,traveltime})=>{
    return(
        <div className="container1">
             <div className="flightCover">
            <div className="sec1">
                <p>Flight Number: <span>{number}</span></p>
                <p> Seats :<span>{seats}</span></p>
            </div>
            <div className="sec2">
                <p>Arrival : <span>{arrivaltime+"/"+arrivaldate}</span></p>
                <p>Departure : <span>{departuretime+"/"+departuredate}</span></p>

            </div>
            <div className="sec3">
                <p>From :<span>{source}</span> </p>
                <p>TO : <span>{destination}</span></p>
            </div>
            <div className="sec4">
                <p> Fare :<span>{fare}</span></p>
                <p>Time :<span>{traveltime}</span></p>
            </div>
        </div>
        {/* <div className="crudContainer">
            
            <button className="red">Update</button>
            <button className="blue">Delete</button>
        </div> */}
        </div>
       
    )
}
export default HomeCard;