import React from "react";
import * as API_LEVEL from "./api/level-api";
import {FormGroup,Label,Input, CardHeader, Button, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";

class Level3 extends React.Component{

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
            resultSuccess: false
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
        return API_LEVEL.getPostLevelInfo(3,(result,status,error) =>{
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

        const value = event.target.value;
        //console.log("name: " + name + "  value: " + value);

        this.setState({
            searchField: value,
        });

    };

    handleSubmitButton(){
        this.setState({
            isTableLoaded: false,
            resultSuccess: false,
            resultData: []
        })
        return API_LEVEL.postLevel3(this.state.searchField,(result,status,error) =>{
            if(result !== null ){
                console.log(result);
                if(status === 202){
                    this.setState({
                        resultData: result,
                        isTableDataLoaded: true,
                        resultSuccess: true
                    });
                }
                if(status === 200){
                    this.setState({
                        resultData: result,
                        isTableDataLoaded: true,
                        resultSuccess: false
                    });
                }
            }else{
                this.setState({
                    errorStatus: status,
                    error: error
                });
                
            }
        });
    }

    nextLevel(){
        window.location.href="/level4";
    }
      

    render(){
        const popoverOpen = this.state.popoverOpen;
        const popoverOpen2 = this.state.popoverOpen2;
        const popoverOpen3 = this.state.popoverOpen3;
        

        return(
            <div>
                
                <CardHeader style = {{fontSize: "20px"}}>
                    <strong> Level3:  {this.state.tableData.levelTitle}</strong>
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
                                <Label style={{fontWeight: "bold", align:"center"}}>Search products</Label>
                                <Input name="product" id="productField" 
                                    onChange={this.handleChange}
                                />
                            
                            </div>
                    
                            <div align='center'>
                                <button type="button" className="btn btn-info m-2"
                                        onClick={()=>{
                                                    this.handleSubmitButton();

                                                    }
                                }>Search</button>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div>
                {this.state.resultSuccess && <button type="button" className="btn btn-info m-2"
                                        onClick={()=>{
                                                    this.nextLevel();

                                                    }
                                }>Next Level</button>}
                    <table style={{width:"100%"}}>

                        <thead style={{fontFamily: "arial", 
                                    borderCollapse: "collapse",
                                    width: "100%"}}>
                        <tr>
                            <th style={{textAlign: "center", border: "1px solid #dddddd",
                                        padding: "8px"}}>Product</th>
                            <th style={{textAlign: "center", border: "1px solid #dddddd",
                                        padding: "8px"}}>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.resultData !== null ? this.state.resultData.map((record) => {
                            const {id, product, description} = record
                            return (
                                <tr key={id}>
                                    <td style={{textAlign: "center", border: "1px solid #dddddd",
                                        padding: "8px"}}>{product}</td>
                                    <td style={{textAlign: "center", border: "1px solid #dddddd",
                                        padding: "8px"}}>{description}</td>
                                </tr>
                            )
                        }):null}
                        
                        </tbody>
                    </table>
                        
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

export default Level3;