import React  from "react";
import { observer } from "mobx-react";
import ReactLogo from "./components/reactlogo";
import * as RBS from "react-bootstrap";
import "./components/register.css";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: "",
      password: "",
      newsletter: false,
      id: 0,
      register: false,
    };
  }

  async LogIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(password);
    //this.setState({isLoggedIn:true});

    const response = await fetch("http://127.0.0.1:3000/users/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    if (response) {
      const data = await response.json();
      this.setState({isLoggedIn:true});
      this.setState({register:false});
      this.setState({username:data.username});
      this.setState({newsletter:data.newsletter});
      this.setState({id:data.id});
      this.setState({password:data.password});
      this.setState({email: data.email});
      console.log(data);
      return data;
    }
  }

  async Register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordtwo = document.getElementById("passwordtwo").value;
    var email = document.getElementById("email").value;

    console.log(password);
if(username !=="" && password!=="" && password===passwordtwo && email!==""){


    const response = await fetch("http://127.0.0.1:3000/newUser", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        newsletter: false,
        admin: false,
      }),
    });
    if (response) {
      this.setState({register: false});
      const data = await response.json();

      return data;
    }
  }
  }

  updateRegister() {
    if (this.state.register === false && this.state.isLoggedIn === false) {
      this.setState({register: true});
    }
    else 
    {
      this.setState({register: false});
    }
  }
  setLoginState() {
    if (this.state.isLoggedIn === false) 
    {
      this.setState({isLoggedIn:true});
    } 
    else 
    {
      this.setState({isLoggedIn:false});
    }
  }

  updateNewsletter() {
    if (this.state.newsletter === false) {
      this.setState({
        newsletter: true,
      });
    } else {
      this.setState({
        newsletter: false,
      });
    }

    const data = {
      id: this.state.id,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      newsletter: this.state.newsletter,
      admin: this.state.admin,
    };

    fetch("http://127.0.0.1:3000/users/" + this.state.id, {
      method: "PUT", // or 'PUT'
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    if (this.state.isLoggedIn === true && this.state.register === false) {
      return (
        <div className="App">
          <RBS.Navbar className="bg-dark justify-content-between">
            <RBS.Form inline>
              <RBS.InputGroup>
                <RBS.Button
                  className="btn btn-light"
                  onClick={this.setLoginState.bind(this)}
                >
                  Log Out
                </RBS.Button>
              </RBS.InputGroup>
            </RBS.Form>
          </RBS.Navbar>
          <body>
            <h1> Välkommen {this.state.username}! </h1>
            {this.state.newsletter ? (
              <h2> Vad bra, du är redan prenumerant </h2>
            ) : (
              <h2> Vill du ha vårat nyhetsbrev? </h2>
            )}
            <RBS.Button
              onClick={this.updateNewsletter.bind(this)}
              className="btn btn-grey"
            >
              NYHETSBREV!
            </RBS.Button>
          </body>
        </div>
      );
    }

    if (this.state.isLoggedIn === false && this.state.register === false) {
      return (
        <div className="App">
          <RBS.Navbar className="bg-dark justify-content-between">
            <RBS.Form inline>
              <RBS.InputGroup>
                <RBS.InputGroup.Prepend>
                  <RBS.InputGroup.Text id="basic-addon1">
                    
                    @
                  </RBS.InputGroup.Text>
                </RBS.InputGroup.Prepend>
                <RBS.FormControl
                  placeholder="Username"
                  arialabel="Username"
                  ariadescribedby="basic-addon1"
                  id="username"
                />
                <RBS.FormControl
                  type="password"
                  placeholder="Password"
                  arialabel="Password"
                  ariadescribedby="basic-addon1"
                  id="password"
                />
                <RBS.Button
                  className="btn btn-light"
                  onClick={this.LogIn.bind(this)}
                >
                  login
                </RBS.Button>
                <RBS.Button
                  className="btn btn-light"
                  onClick={this.updateRegister.bind(this)}
                >
                  register
                </RBS.Button>
              </RBS.InputGroup>
            </RBS.Form>
          </RBS.Navbar>

          <ReactLogo />
        </div>
      );
    }
    

    if (this.state.register === true) {
      return (
        <div className="App">
          <RBS.Navbar className="bg-dark justify-content-between">
            <RBS.Form inline>
              <RBS.InputGroup>
                <RBS.InputGroup.Prepend>
                  <RBS.InputGroup.Text id="basic-addon1"  onClick={this.updateRegister.bind(this)}>
                    Back
                  </RBS.InputGroup.Text>
                </RBS.InputGroup.Prepend>
              </RBS.InputGroup>
            </RBS.Form>
          </RBS.Navbar>

          <div id="login-box">
            <RBS.Form>
              <RBS.InputGroup>
                <div className="left">
                  <h1> Sign up </h1>
                  <RBS.FormControl
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                  <RBS.FormControl
                    id="email"
                    type="text"
                    name="email"
                    placeholder="E-mail"
                  />
                  <RBS.FormControl
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <RBS.FormControl
                    id="passwordtwo"
                    type="password"
                    name="password2"
                    placeholder="Retype password"
                  />
                  <input
                    onClick={this.Register.bind(this)}
                    name="signup_submit"
                    value="Sign me up"
                    type="submit"
                   
                  />
                </div>
                <div className="right">
                  <span className="loginwith">
                    Sign in with <br />
                    social network
                  </span>
                  <button className="social-signin facebook">
                    Log in with facebook
                  </button>
                  <button className="social-signin twitter">
                    Log in with Twitter
                  </button>
                  <button className="social-signin google">
                    Log in with Google +
                  </button>
                </div>
                <div className="or"> OR</div>
              </RBS.InputGroup>
            </RBS.Form>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
