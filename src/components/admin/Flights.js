import React,{useState, useEffect, useRef} from 'react'
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Link } from 'react-router-dom';

const Flights = (props) => {

    const [flights,setFlights] = useState();
    const [message,setMessage] = useState("");

    var admin = null;
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if(!currentUser){
            var c = window.confirm("please login as Admin");
          props.history.push("/login")
          window.location.reload();
        }
        if(currentUser.roles.includes("ROLE_ADMIN")){
            UserService.getAllFlights().then(
            (response) => {
                setFlights(response);
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
    
                setMessage(resMessage);
            }
            );
        
    }
    else{
      var c = window.confirm("please login as Admin");
          props.history.push("/login")
          window.location.reload();
    }
    },[]);

    return (
        <div className="container" >
                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                     )}

                <div className="container text-center" style={{padding: "30px 0px"}}>
                        <h3 className="bg-info "> Click Below to add flights</h3>
                        <Link class="btn btn-secondary" to="/addFlights">Add Flights</Link>
                        <br></br>
                </div>

                { flights && <div class="container overflow-auto"  >
                    <h2>All Flights</h2>      
                    <table class="table table-striped" >
                        <thead>
                        <tr>
                        <th>FlightNO</th>
                            <th>Depart</th>
                            <th>Duration</th>
                            <th>Arrival</th>
                            <th>Fare</th>
                        </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight,index)  => 
                                                            
                                 <tr key={index}>
                                    <td>{flight.flightNumber}</td>
                                                                <td><img src={flight.logo} width="50px" height="50px"/></td>
                                                                <td>
                                                                  {flight.source}<br/>
                                                                  {flight.departDate}<br/>
                                                                  {flight.departTime}
                                                                </td>
                                                                <tb>
                                                                  {flight.travelTime}<br/>
                                                                 <i class="fas fa-long-arrow-alt-right fa-3x"></i> 
                                                                </tb>
                                                                <td>
                                                                  {flight.destination}<br/>
                                                                  {flight.arrivalDate}<br/>
                                                                  {flight.arrivalTime}
                                                                </td>

                                                                <td>{flight.fare}</td>
                                    <td><Link class="btn btn-primary" to={`/updateFlight/${flight.flightNumber}`}>Update</Link></td>
                                    <td><Link class="btn btn-danger" to={`/deleteFlight/${flight.flightNumber}`}>Delete</Link></td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                    </div> 
                }

        </div>
    )
}

export default Flights;
