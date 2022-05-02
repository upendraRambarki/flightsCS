import React from 'react'
import './AdminNavBar.css'

export default function AdminNavbar() {
  return (
    <div>
       
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li class="divider"></li>
      <li><a href="#!">three</a></li>
    </ul>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Upendra Airlines</a>
        <ul class="right hide-on-med-and-down">
          <li><a href="AddFlights">Add Flights</a></li>
          <li><a href="badges.html">Update Flights</a></li>
          <li><a href="SignUp">Sign Up</a></li>
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Register<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      </div>
    </nav>
    </div>
  )
}
