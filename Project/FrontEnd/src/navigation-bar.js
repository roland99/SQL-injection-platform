import React from 'react'
import logo from './commons/images/logo.png';

import {
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    NavItem,
    Collapse
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar
    color="dark"
    dark
    expand
    fixed=""
    
  >
    <NavbarBrand href="/">
      <img src={logo} width={40} height={30}></img>
    </NavbarBrand>
    <Collapse navbar>
      <Nav
        className="ma-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/">
            Home
          </NavLink>
        </NavItem>
        { sessionStorage.getItem("loggedIn") === 'true' && sessionStorage.getItem("isAdmin") === "false" && <NavItem>
          <NavLink  href="/user">
            Profile
          </NavLink>
        </NavItem>}
       
      </Nav>
      <Nav
      className="ml-auto"
      navbar
      >
        <NavItem>
            <NavLink href="/register">
                Register
            </NavLink>
        </NavItem>

        {( sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false") && <NavItem>
            <NavLink href="/login">
                Login
            </NavLink>
        </NavItem>}

        {sessionStorage.getItem("loggedIn") === "true" && <NavItem>
            <NavLink href="/login" onClick={() =>{
              sessionStorage.setItem("isAdmin",false);
              sessionStorage.setItem("loggedIn", "false");
              }
            }>
                Log out
            </NavLink>
        </NavItem>}

      </Nav>
    </Collapse>
  </Navbar>
    </div>
);

export default NavigationBar
