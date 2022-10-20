import React from 'react';
import { Button } from 'reactstrap';

class LevelTable extends React.Component{

    constructor(props){
        super(props);
        this.state={
            tableData: this.props.levelData,
            isLoaded: false,
        }
        this.goToLevel = this.goToLevel.bind(this);
    }


    goToLevel(){

        window.location.href="/level"+ this.state.tableData.level;
    }

    render(){
        return(
            <div class="row " style={{background:"#f3f2ed"}}>
                                <div class="col-10" style={{border:"2px solid #d3d3ce", padding:"10px"}}>
                                {this.state.tableData.level +". " + this.state.tableData.levelTitle} 
                                </div>
                                <div class="col" style={{border:"2px solid #d3d3ce", padding:"5px"}}>
                                <Button className="btn btn-info" style={{margin:"auto", display:"block", paddingLeft:"25px",paddingRight:"25px"}} onClick={this.goToLevel} > Solve </Button>
                                </div>
                                
                            </div>
        )
    }

}

export default LevelTable;