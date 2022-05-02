import React,{useState, useEffect, useRef} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import { Link } from 'react-router-dom';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const validate = (value) => {
    if (value.length < 1 || value.length > 15) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required
        </div>
      );
    }
  };

const AddFlights = (props) => {

    const form = useRef();
    const checkBtn = useRef();
    
   
    const [flightNumber, setFlightNumber] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [departTime, setDepartTime] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [fare, setFare] = useState("");
    const [seatsRemaining, setSeatsRemaining] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const currentUser = AuthService.getCurrentUser();

    const onChangeFlightNumber = (e) => {
        const FlightNumber = e.target.value;
        setFlightNumber(FlightNumber);
      };
      const onChangeSource = (e) => {
          const Source = e.target.value;
          setSource(Source);
        };
  
      const onChangeDestination = (e) => {
          const Destination = e.target.value;
          setDestination(Destination);
        };
    
      const onChangeDepartDate = (e) => {
        const Date = e.target.value;
        setDepartDate(Date);
      };

      const onChangeArrivalDate = (e) => {
        const Date = e.target.value;
        setArrivalDate(Date);
      };
  
      const onChangeDepartTime = (e) => {
          const Time = e.target.value;
          setDepartTime(Time);
        };

        const onChangeArrivalTime = (e) => {
          const Time = e.target.value;
          setArrivalTime(Time);
        };

        const onChangeTravelTime = (e) => {
          const Time = e.target.value;
          setTravelTime(Time);
        };
  
        const onChangeFare = (e) => {
          const Fare = e.target.value;
          setFare(Fare);
        };


        const onChangeSeatsRemaining= (e) => {
            const SeatsRemaining = e.target.value;
            setSeatsRemaining(SeatsRemaining);
          };
    
      const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          UserService.addFlight({
            flightNumber,
            source,
            departDate,
            departTime,
            destination,
            arrivalDate,
            arrivalTime,
            travelTime,
            fare,
            seatsRemaining
          }).then(
            (response) => {
              setMessage("Succefully Added");
              setSuccessful(true);
              setLoading(false);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);
              setSuccessful(false);
              setLoading(false);
            }
          );
        }
      };


    useEffect(() => {
        if(!(currentUser.roles.includes("ROLE_ADMIN"))){
            
            var c = window.confirm("please login as Admin");
            props.history.push("/login")
            window.location.reload();
        }
    });


    return (
        <div className="col-md-12">
      <div className="card card-container">
        <img
          src="https://p.kindpng.com/picc/s/491-4910127_airplane-clipart-logo-airplane-logo-png-transparent-png.png"
          alt="flight-logo"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="flightNumber">Flight Number</label>
                <Input
                  type="number"
                  className="form-control"
                  name="flightNumber"
                  value={flightNumber}
                  onChange={onChangeFlightNumber}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="source">source</label>
                <Input
                  type="text"
                  className="form-control"
                  name="source"
                  value={source}
                  onChange={onChangeSource}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="destination">destination</label>
                <Input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={destination}
                  onChange={onChangeDestination}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                    <label htmlFor="departDate">DepartDate</label>
                    <Input
                    type="date"
                    className="form-control"
                    
                    name="departDate"
                    value={departDate}
                    onChange={onChangeDepartDate}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departTime">DepartTime</label>
                    <Input
                    type="time"
                    className="form-control"
                    
                    name="departTime"
                    value={departTime}
                    onChange={onChangeDepartTime}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalDate">ArrivalDate</label>
                    <Input
                    type="date"
                    className="form-control"
                    
                    name="arrivalDate"
                    value={arrivalDate}
                    onChange={onChangeArrivalDate}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalTime">ArrivalTime</label>
                    <Input
                    type="time"
                    className="form-control"
                    
                    name="arrivalTime"
                    value={arrivalTime}
                    onChange={onChangeArrivalTime}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fare">Fare</label>
                    <Input
                    type="number"
                    className="form-control"
                    
                    name="fare"
                    value={fare}
                    onChange={onChangeFare}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="travelTime">TravelTime</label>
                    <Input
                    type="text"
                    className="form-control"
                    
                    name="travelTime"
                    value={travelTime}
                    onChange={onChangeTravelTime}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="seatsRemaining">Seats</label>
                    <Input
                    type="number"
                    className="form-control"
                    
                    name="seatsRemaining"
                    value={seatsRemaining}
                    onChange={onChangeSeatsRemaining}
                    validations={[required]}
                    />
                </div>

              <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add</span>
                    </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    )
}

export default AddFlights;
// import axios from 'axios'
// import React, { Component } from 'react'
// import './Admin.css'
// //import AdminNavbar from './AdminNavbar'

// export class AddFlights extends Component {

//   constructor(props)
//   {
//     super(props)
//     this.state={
//       arr:[],
//       id:0,
//       flightNo:'',
//       from:'',
//       to:'',
//       date:''

//     }
//   }
//   componentDidMount(){
//     axios.get("http://localhost:8080/flight/")
//     .then((res)=>{
//       this.setState({
//         arr:res.data,
//         id:0,
//         flightNo:'',
//         from:'',
//         to:'',
//         date:''
//       })
//     })
//   }

//   submit(evenet,id){
//     evenet.preventDefault();
//     if(id===0){
//       axios.post("http://localhost:8080/flight/",{
//         flightNo:this.state.flightNo,
//         from:this.state.from,
//         to:this.state.to,
//         date:this.state.date
//       }).then(()=>{
//         this.componentDidMount();
//       })
//     }else{
//       axios.put("http://localhost:8080/flight/",{
//         id:id,
//         flightNo:this.state.flightNo,
//         from:this.state.from,
//         to:this.state.to,
//         date:this.state.date
//       }).then(()=>{
//         this.componentDidMount();
//       })
//     }
//   }
//   render() {
//     return (
//           <div>
              
        
//          <div className='container'>
           
//             <div className='row'>
//              <div className='col s6'>
//                 <form onSubmit={(e)=>this.submit(e,this.state.id)}>
//                     <div className="input-field col s12">
//                      <i className="material-icons prefix">input</i>           
//                     <input value={this.state.flightNo} onChange={(e)=>this.setState({flightNo:e.target.value})} type="text" id="autocomplete-input" className="autocomplete1"/>
//                    <label htmlFor="autocomplete-input">Id</label>
//                      </div>
//                   <div className="input-field col s12">
//                    <i className="material-icons prefix">flight_takeoff</i>
//                     <input value={this.state.from} onChange={(e)=>this.setState({from:e.target.value})} type="text" id="autocomplete-input" className="autocomplete2"/>
//                     <label htmlFor="autocomplete-input">From</label>
//                   </div>
//                       <div className="input-field col s12">
//                         <i className="material-icons prefix">flight_land</i>
//                         <input value={this.state.to} onChange={(e)=>this.setState({to:e.target.value})} type="text" id="autocomplete-input" className="autocomplete3"/>
//                         <label htmlFor="autocomplete-input">To</label>
//                       </div>
//                       <div className="input-field col s12">
//                         <i className="material-icons prefix">flight_land</i>
//                       <input value={this.state.date}  onChange={(e)=>this.setState({date:e.target.value})} type="date"id="autocomplete-input" name="travelDate"className="autocomplete4" />
//                       <label htmlFor="autocomplete-input">To</label>
//                       </div>
//                       <button className="btn waves-effect waves-light" type="submit" name="action">Add Flights
//                         <i className="material-icons right">send</i>
//                     </button>
//                       </form>
//               </div>
//                   <div className='col s6'>
//                   <table>
//                             <thead>
//                               <tr>
//                                   <th>flightNo</th>
//                                   <th>from</th>
//                                   <th>to</th>
//                                   <th>Date Of journey</th>
//                               </tr>
//                             </thead>

//                             <tbody>
//                               {
//                                 this.state.arr.map(arr=>
//                                   <tr>
//                                   <td>{arr.flightNo}</td>
//                                   <td>{arr.from}</td>
//                                   <td>{arr.to}</td>
//                                   <td>{arr.date}</td>
//                                   {/* <td>
//                                   <button className="btn waves-effect waves-light" type="submit" name="action">Add Flights
//                                   <i className="material-icons right">send</i>
//                                    </button>
//                                   </td> */}
//                                    </tr>
//                                 )
//                               }

//                             </tbody>
//                           </table>
//                   </div>
//             </div>
//          </div>
//          </div>
//     )
//   }
// }