import axios from 'axios'
import React, { Component } from 'react'
import './showAllFlights.css'

export class showAllFlights extends Component {

  constructor(props)
  {
    super(props)
    this.state={
      arr:[],
      id:0,
      flightNo:'',
      from:'',
      to:''

    }
  }
  componentDidMount(){
    axios.get("http://localhost:8080/flight/")
    .then((res)=>{
      this.setState({
        arr:res.data,
        id:0,
        flightNo:'',
        from:'',
        to:''

      })
    })
  }

  submit(evenet,id){
    evenet.preventDefault();
    if(id===0){
      axios.post("http://localhost:8080/flight/",{
        flightNo:this.state.flightNo,
        from:this.state.from,
        to:this.state.to
      }).then(()=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/flight/",{
        id:id,
        flightNo:this.state.flightNo,
        from:this.state.from,
        to:this.state.to
      }).then(()=>{
        this.componentDidMount();
      })
    }
  }
  render() {
    return (
          <div>
              
        
         <div className='container'>
           
            <div className='row'>
             <div className='col s6'>
                <form onSubmit={(e)=>this.submit(e,this.state.id)}>
                    <div className="input-field col s12">
                     <i className="material-icons prefix">input</i>           
                    <input value={this.state.flightNo} onChange={(e)=>this.setState({flightNo:e.target.value})} type="text" id="autocomplete-input" className="autocomplete1"/>
                   <label htmlFor="autocomplete-input">Id</label>
                     </div>
                  <div className="input-field col s12">
                   <i className="material-icons prefix">flight_takeoff</i>
                    <input value={this.state.from} onChange={(e)=>this.setState({from:e.target.value})} type="text" id="autocomplete-input" className="autocomplete2"/>
                    <label htmlFor="autocomplete-input">From</label>
                  </div>
                      <div className="input-field col s12">
                        <i className="material-icons prefix">flight_land</i>
                        <input value={this.state.to} onChange={(e)=>this.setState({to:e.target.value})} type="text" id="autocomplete-input" className="autocomplete3"/>
                        <label htmlFor="autocomplete-input">To</label>
                      </div>
                      <button className="btn waves-effect waves-light" type="submit" name="action">Add Flights
                        <i className="material-icons right">send</i>
                    </button>
                      </form>
              </div>
                  <div className='col s6'>
                  <table>
                            <thead>
                              <tr>
                                  <th>flightNo</th>
                                  <th>from</th>
                                  <th>to</th>
                                  <th>Date Of journey</th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                this.state.arr.map(arr=>
                                  <tr>
                                  <td>{arr.flightNo}</td>
                                  <td>{arr.from}</td>
                                  <td>{arr.to}</td>
                                  {/* <td>
                                  <button className="btn waves-effect waves-light" type="submit" name="action">Add Flights
                                  <i className="material-icons right">send</i>
                                   </button>
                                  </td> */}
                                   </tr>
                                )
                              }

                            </tbody>
                          </table>
                  </div>
            </div>
         </div>
         </div>
    )
  }
}