import React from "react";
import * as API_USER from "./api/user-api";
import { FormGroup, Input, Label} from 'reactstrap';
import validate from "../validators/validator";
import {Alert} from "react-bootstrap";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            formIsValid:false,
            formControls: {
                email: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        emailValidator: true

                    }
                },
                password: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                remember:{
                    value: false
                }
            }
        };
        this.handleSubmitButton=this.handleSubmitButton.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;


        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handleSubmitButton(){
        const body = {
            "email": this.state.formControls.email.value,
            "password": this.state.formControls.password.value,
        };

        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        };

        return API_USER.postLoginUser(body, (result,status,error) =>{
            if(result !== null && (status === 200 || status === 201)){
                var req = new XMLHttpRequest();
                req.open('POST', "https://licenta-backend-gr.herokuapp.com/user/login", false);
                req.setRequestHeader('Accept', 'application/json');
                req.setRequestHeader('Content-Type', 'application/json');
                req.setRequestHeader('Access-Control-Allow-Origin', '*');
                req.send(JSON.stringify(body));
                var header = req.getResponseHeader("authorization");
                console.log(header);
                localStorage.setItem('jwt', header);
                sessionStorage.setItem("name",result.name);
                sessionStorage.setItem("userId",result.id);
                sessionStorage.setItem("loggedIn","true");
                sessionStorage.setItem("isAdmin",result.isAdmin);
                if(result.isAdmin === true){
                    window.location.href="/admin"
                }else{
                    window.location.href="/user"
                }
                //this.reloadHandler();
            }else{
                
                this.setState({
                    errorStatus: status,
                });
                //alert("Username sau parola invalida");
            }
        });
        
    }
    

    render() {
        return (


                <FormGroup  style={{background: "#dddddd", padding: "5px 20px 5px 20px", borderRadius: "30px",width:'30%', maxWidth:'1000px',top:'20%', left:'35%', position: 'absolute'}}>
                <h3 align="center" >Login</h3>
                <div className="form-group" >
                    {this.state.errorStatus === 202 && <Alert variant="danger">Invalid username or password</Alert>}
                    <Label style={{fontWeight: "bold"}}>Email address</Label>
                    <Input name="email" id="emailField" placeholder="Enter email"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1:0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message row"}> * Email must have be [xxx@domain] format </div>}
                </div>
                <div className="form-group">
                    <label style={{fontWeight: "bold"}}>Password</label>
                    <Input type="password" name="password" id="passwordField" placeholder="Enter password"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1:0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message row"}> * Password length must be greater than 3 </div>}
                </div>
                    <div align='center'>
                <button type="button" className="btn btn-info m-2"
                        onClick={()=>{
                                    this.handleSubmitButton();

                                    }
                }>Login</button>
                </div>
                <p className="forgot-password text-right">
                    <a href="/generateCode">Forgot  password?</a>
                </p>
                </FormGroup>


        );
    }

}

export default Login;