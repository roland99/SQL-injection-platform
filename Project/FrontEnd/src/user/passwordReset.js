import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import validate from "../validators/validator";
import * as API_USER from "./api/user-api";
export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formIsValid:false,
            formControls: {
                password: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                code: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                }
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleResetPassword=this.handleResetPassword.bind(this);
    }

    handleResetPassword(){
        const body = {
            "email": window.sessionStorage.getItem('email'),
            "password": this.state.formControls.password.value,
            "code": this.state.formControls.code.value,
        };

        return API_USER.postResetPassword(body,(result, status, error) => {
            if(result !==null && status === 200){
                alert(result.message);
                window.location.href="/login";
            }else{
                alert(error);
            }
        });
        
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
            <div>
            <FormGroup style={{background: "#dddddd", padding: "5px 20px 5px 20px", borderRadius: "30px",width:'30%', maxWidth:'1000px',top:'20%', left:'35%', position: 'absolute'}}>
                <div>
                    <button type="button" className="btn btn-info"
                            onClick={()=>{
                                window.location.href="/generateCode";
                            }
                            }>Back to email  </button>
                </div>
                <h3 align="center">Reset password </h3>
                <div className="form-group">
                    <Label style={{fontWeight: "bold"}}>Code Received</Label>
                    <Input name="code" id="codeField" placeholder="Enter code"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.code.value}
                           touched={this.state.formControls.code.touched? 1:0}
                           valid={this.state.formControls.code.valid}
                           required
                    />
                </div>
                <div className="form-group">
                    <Label style={{fontWeight: "bold"}}>New Password</Label>
                    <Input name="password" id="passwordField" type="password" placeholder="Enter new password"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1:0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                </div>
                <div align='center'>
                    <button disabled={!this.state.formIsValid} type="button" className="btn btn-info"
                            onClick={()=>{
                                this.handleResetPassword();
                            }
                            }>Change Password </button>
                </div>
            </FormGroup>
            </div>
        );
    }
}