import React,{useState, useEffect, useRef} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";



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


const UpdateFlight = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    
    const flightNumber =  props.match.params.id ;
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
          UserService.updateFlight({
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
          },flightNumber).then(
            (response) => {
              setMessage("Succefully Updated");
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
            <h3 className=" text-center m-3 bg-info">Updating Flight with id: <strong>{flightNumber}</strong></h3>
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
                        <span>Confirm Update</span>
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

export default UpdateFlight
