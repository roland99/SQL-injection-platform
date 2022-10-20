import React from 'react';
import validate from '../validators/validator';
import APIResponseErrorMessage from '../commons/errorhandling/api-response-error-message';
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as API_USER from "./api/user-api";

class UserRegister extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                email: {
                    value: '',
                    placeholder: 'Email...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,

                    }
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    }
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
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

    registerUser(user){
        return API_USER.postRegisterUser(user,(result,status,error) => {
            if(result !== null &&  status === 201){
                alert("User created");
                window.location.href = "/login";
            }else{
                if(result !== null && status === 200){
                    alert(result.message);
                }else{
                    alert("Something went wrong!");
                }
            }
        });
    }

    handleSubmit() {
        let user = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value
        };

        console.log(user);
        this.registerUser(user);
    }

    render() {
        return (
            <FormGroup style={{background: "#dddddd", padding: "5px 20px 5px 20px", borderRadius: "30px",width:'30%', maxWidth:'1000px',top:'20%', left:'35%', position: 'absolute'}}>
                <h3 align="center">Sign Up</h3>
                <div className="form-group">
                    <label style={{fontWeight: "bold"}}>Name</label>
                    <Input name="name" id="nameField" placeholder="Enter name"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1:0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must contain at least 3 letters </div>}
                </div>

                <div className="form-group">
                    <label style={{fontWeight: "bold"}}>Email address</label>
                    <Input name="email" id="emailField" placeholder="Enter email"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1:0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message row"}> * Must be a valid email format </div>}
                </div>
                <div className="form-group">
                    <label style={{fontWeight: "bold"}}>Password</label>
                    <Input type="password"  name="password" id="passwordField" placeholder="Enter password"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1:0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message row"}> * Password must contain at least 3 letters </div>}
                </div>

                <div className="form-group">
                    <label style={{fontWeight: "bold"}}>Confirm Password</label>
                    <Input type="password" name="confirmPassword" id="confirmPasswordField" placeholder="Confirm password"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.confirmPassword.value}
                           touched={this.state.formControls.confirmPassword.touched? 1:0}
                           valid={this.state.formControls.confirmPassword.valid}
                           required
                    />
                    {this.state.formControls.password.value===this.state.formControls.confirmPassword.value ? null :
                    <div className={"error-message row"}> * Passwords don't match </div>}

                </div>

                
                <div align='center'>
                    <button type="button" className="btn btn-info m-2" onClick={() => {
                        this.handleSubmit();

                    }
                    }>Sign Up</button>
                </div>

                <p className="forgot-password text-right">
                    {/*Already registered <a href="#">sign in?</a>*/}
                </p>
                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </FormGroup>
        );
    }


}

export default UserRegister;