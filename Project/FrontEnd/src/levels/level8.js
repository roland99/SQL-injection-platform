import React from "react";
import * as API_LEVEL from "./api/level-api";
import {FormGroup,Label,Input, CardHeader, Button, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";


class Level8 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            popoverOpen: false,
            popoverOpen2: false,
            popoverOpen3: false,
            isLoaded: false,
            isTableDataLoaded: false,
            resultData: [],
            resultSuccess: false,
            formControls: {
                username: {
                    value: ''
                },
                password: {
                    value: ''
                    }
                }
        };
        this.togglePopover = this.togglePopover.bind(this);
        this.togglePopover2 = this.togglePopover2.bind(this);
        this.togglePopover3 = this.togglePopover3.bind(this);
    }
    
    togglePopover() {   
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    togglePopover2() {   
        this.setState({ popoverOpen2: !this.state.popoverOpen2 });
    }

    togglePopover3() {   
        this.setState({ popoverOpen3: !this.state.popoverOpen3 });
    }

    fetchLevelInfo(){
        return API_LEVEL.getPostLevelInfo(8,(result,status,error) =>{
            if(result !== null && (status === 200 || status === 201)){
                console.log(result);
                this.setState({
                    tableData: result,
                    isLoaded: true,
                    searchField: ''
                })
            }else{
                this.setState({
                    errorStatus: status,
                });
                
            }
        });
    }

    componentDidMount(){
        this.fetchLevelInfo();
        
    }

    replaceWithBr(string) {
        return string.replace(/\n/g, "<br />")
    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;


        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls,
            
        });

    };

    handleSubmitButton(){
        this.setState({
            isTableLoaded: false,
            resultSuccess: false,
            resultData: []
        })
        const body = {
            "email": this.state.formControls.username.value,
            "password": this.state.formControls.password.value,
        };
        return API_LEVEL.postLevel8(body,(result,status,error) =>{
            if(result !== null ){
                
                if(status === 202){
                    this.setState({
                        resultData: result,
                        isTableDataLoaded: true,
                        resultSuccess: true,
                        errorStatus: 0
                    });
                }
                if(status === 200){
                    this.setState({
                        resultData: result,
                        isTableDataLoaded: true,
                        resultSuccess: false,
                        errorStaus: 0
                    });
                }
                
            }else{
                this.setState({
                    errorStatus: status,
                    error: error
                });
                console.log(error);
                
            }
        });
    }

    nextLevel(){
        window.location.href="/user";
    }
      

    render(){
        const popoverOpen = this.state.popoverOpen;
        const popoverOpen2 = this.state.popoverOpen2;
        const popoverOpen3 = this.state.popoverOpen3;
        

        return(
            <div>
                
                <CardHeader style = {{fontSize: "20px"}}>
                    <strong> Level8:  {this.state.tableData.levelTitle}</strong>
                </CardHeader>
                <div class="row" style={{padding:"10px", margin:"auto", }}>
                    <div class="col" style={{padding:"10px", margin:"auto", display:"block"}}>
                        <Button className="btn-info" id="mypopover" type="button" style={{}}>
                            Description
                        </Button>
                        <Popover
                            placement="bottom"
                            isOpen={popoverOpen}
                            target="mypopover"
                            toggle={this.togglePopover}
                        >
                            <PopoverHeader>Description</PopoverHeader>
                            <PopoverBody>
                            {this.state.isLoaded && <p dangerouslySetInnerHTML={{__html: this.replaceWithBr(this.state.tableData.levelDescription)}} />}
                            </PopoverBody>
                        </Popover>
                    </div>
                    <div class="col" style={{padding:"10px", margin:"auto", display:"block"}}>
                        <Button className="btn-info" id="mypopover2" type="button" style={{}}>
                            Hint
                        </Button>
                        <Popover
                            placement="bottom"
                            isOpen={popoverOpen2}
                            target="mypopover2"
                            toggle={this.togglePopover2}
                        >
                            <PopoverHeader>Hint</PopoverHeader>
                            <PopoverBody>
                            {this.state.isLoaded && <p dangerouslySetInnerHTML={{__html: this.replaceWithBr(this.state.tableData.levelHint)}} />}
                            </PopoverBody>
                        </Popover>
                    </div>
                    <div class="col" style={{padding:"10px", margin:"auto", display:"block"}}>
                        <Button  className="btn-info" id="mypopover3" type="button" style={{}}>
                            Solution
                        </Button>
                        <Popover
                            placement="bottom"
                            isOpen={popoverOpen3}
                            target="mypopover3"
                            toggle={this.togglePopover3}
                        >
                            <PopoverHeader>Solution </PopoverHeader>
                            <PopoverBody>
                            {this.state.isLoaded && <p dangerouslySetInnerHTML={{__html: this.replaceWithBr(this.state.tableData.levelSolution)}} />}
                            </PopoverBody>
                        </Popover>
                    </div>
                </div>
                <div class="row" style={{padding:"10px", margin:"auto", display:"block"}}>
                    <div class="col" style={{padding:"10px", margin:"auto", display:"block"}}>
                        <FormGroup  style={{align:"center", padding: "5px 20px 5px 20px", borderRadius: "30px",width:'30%', maxWidth:'1000px',top:'20%', left:'35%', position:"relative"}}>
                    
                            <div className="form-group" >
                                <Label style={{fontWeight: "bold", align:"center"}}>Username</Label>
                                <Input name="username" id="usernameField" placeholder="Username"
                                    onChange={this.handleChange}
                                />
                            
                            </div>

                            <div className="form-group">
                                <Label style={{fontWeight: "bold"}}>Password</Label>
                                <Input type="password" name="password" id="passwordField" placeholder="Enter password"
                                    onChange={this.handleChange}
                                    
                                />
                                
                            </div>
                    
                            <div align='center'>
                                <button type="button" className="btn btn-info m-2"
                                        onClick={()=>{
                                                    this.handleSubmitButton();

                                                    }
                                }>Sign in</button>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div>
                    <p> Response: 
                    {this.state.isTableDataLoaded && this.state.resultData.username}
                    </p>

                {this.state.resultSuccess && <button type="button" className="btn btn-info m-2"
                                        onClick={()=>{
                                                    this.nextLevel();

                                                    }
                                }>Back to Home</button>}
                {this.state.resultSuccess && alert("Congratulation, you completed all the levels!")} 
                    
                    
                        
                        
        
                        
                        {console.log(this.state.resultData)}
                        {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                                errorStatus={this.state.errorStatus}
                                                                error={this.state.error}
                                                            />   }
                </div>

            </div>
        )
    }
}

export default Level8;