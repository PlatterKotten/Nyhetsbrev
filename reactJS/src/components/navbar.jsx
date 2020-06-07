import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import * as RBS from "react-bootstrap"

import App from '../App'


class NavBar extends Component {



  constructor(props){
  super(props);
  

  }
  
     
    render() { 
        return ( 
<RBS.Navbar className="bg-dark justify-content-between">
  <RBS.Form inline>
    <RBS.InputGroup>
      <RBS.InputGroup.Prepend>
        <RBS.InputGroup.Text id="basic-addon1">@</RBS.InputGroup.Text>
      </RBS.InputGroup.Prepend>
      <RBS.FormControl 
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        
      />
      <RBS.FormControl type="password"

        placeholder="Password"
        aria-label="Password"
        aria-describedby="basic-addon1"
      />
        <RBS.Button 
                           className="btn btn-light"
                           text={'Log in'}
                           disabled={false}
                           onClick={App.login}
                         >login
         </RBS.Button>
    </RBS.InputGroup>
  </RBS.Form>
</RBS.Navbar>
         );
    }
}
 
export default NavBar;






