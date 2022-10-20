import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import {HOST} from "../commons/hosts";
import validate from "../validators/validator";
import * as API_USER from "./api/user-api";
export default class GenerateCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                }
            }
        };
        this.handleGenerateCode=this.handleGenerateCode.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleGenerateCode(){
        const body = {
            "email": this.state.formControls.email.value,
        };
        return API_USER.postGenerateCode(body,(result,status,error) =>{
            if(result.message === "Not a registered email!"){
                alert(result.message);
            }else{
                sessionStorage.setItem('email', this.state.formControls.email.value);
                window.location.href="/resetPassword";
            }
        })

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

    render() {
        return (
            <FormGroup  style={{background: "#dddddd", padding: "5px 20px 5px 20px", borderRadius: "30px",width:'30%', maxWidth:'1000px',top:'20%', left:'35%', position: 'absolute'}}>
                    <h3 align="center">Generate Code For Password Reset </h3>
                    <div align="center">
                        <button type="button" className="btn btn-dark m-2 "
                                onClick={()=>{
                                    window.location.href="/login";
                                }
                                }>Back to login </button>
                    </div>
                    <div className="form-group" align="center">
                        <Label style={{fontWeight: "bold"}}>A code with 4 digits will be generated and sent to your email .</Label>
                    </div>
                    <div className="form-group">
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
                    <div align='center'>
                        <button disabled={!this.state.formIsValid}  type="button" className="btn btn-info"
                                onClick={()=>{
                                    this.handleGenerateCode();
                                }
                                }>Generate Code </button>
                    </div>
                </FormGroup>
        );
    }
}