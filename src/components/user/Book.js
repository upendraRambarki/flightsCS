import React,{useState} from 'react'
const Book=()=>{
    const [search,setsearch]=useState('')
    const submitHandler=e=>{
        e.prevetDefault();
        fetch("localhost:8081/flights/").then(response=>response.json())
        .then()
        
    }
    return (
        <div>
            <center>
            <h4>Book your ticket here</h4><br/>
            <div className='col s6'>
                  <table>
                            <thead>
                              <tr>
                                  <th>firstname</th>
                                  <th>lastname</th>
                                  <th>age</th>
                                  <th>gender</th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                this.state.arr.map(arr=>
                                  <tr>
                                  <td>{arr.firstname}</td>
                                  <td>{arr.lastname}</td>
                                  <td>{arr.age}</td>
                                  <td>{arr.gender}</td>
                                  <td>
                                  <butdestinationn className="btn waves-effect waves-light" type="submit" name="action">Add Flights
                                  <i className="material-icons right">send</i>
                                   </butdestinationn>
                                  </td>
                                   </tr>
                                )
                              }

                            </tbody>
                          </table>
                  </div>
            {/* <form>
                <input type="text" name="firstname" value={search} z
                onChange={(e)=>setsearch(e.target.value)} /><br/>
                <input type="text"name="lastname" value={search}
                 onChange={(e)=>setsearch(e.target.value)}/><br/>
                <input type="submit" value="Book"/><br/>
            </form> */}
            </center>
           
        </div>
    )
}
export default Book