import React from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'reactstrap';
import backImg from "../commons/images/2.jpg"
import * as API_USER from "./api/user-api";
import LevelTable from './components/levelTable';


class UserContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            levelData:[],
            isLoaded: false,
            fetchLevelsBool: false
        };
    }


    componentDidMount(){
        this.setState({
            
            name: sessionStorage.getItem("name"),
            id: sessionStorage.getItem("userId")
        })
        this.fetchLevels();
        console.log("Asta")
        console.log(this.state);

    }

    renderLevelTable(data){

        const rows = [];
        let nr = this.state.levelData.length;
        for(let i =0; i<nr; i++){
            rows.push(<LevelTable levelData = {data[i]} key = {data[i].id}></LevelTable>);
        }
        return rows;
    }

    handleFetchLevels = () => {
        let data = this.state.levelData;

        return this.renderLevelTable(data);
    }

    fetchLevels(){
        //get the levels
        return API_USER.getLevels((result, status, err) =>{
            if(result !== null && status === 200){
                console.log("Query executat");
                console.log(result);
                this.setState({
                    levelData: result,
                    isLoaded: true,
                    fetchLevelsBool: true

                });
            }else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }))
            }
        });
        
    }

    reload(){
        this.setState({
            isLoaded: false
        })
    }
    

    render(){
        return(
            <div style = {{fontSize: "17px",}}>
                <CardHeader style = {{fontSize: "20px"}}>
                    <strong> Welcome {this.state.name} !</strong>
                </CardHeader>
                <Card  style={{
                        position: "relative",
                        maxWidth: "100%",
                        margin: "0 auto"}}>
                    <img src={backImg}></img>
                    <div className="text-center " style={{position: "absolute",
                        bottom: "0",
                        background: "rgb(0, 0, 0)", /* Fallback color */
                        background: "rgba(0, 0, 0, 0.5)", /* Black background with 0.5 opacity */
                        color:"#f1f1f1",
                        width: "100%",
                        padding: "20px"}}>
                    <CardTitle style = {{fontSize: "20px"}}><strong>Here you can learn and exercise your SQL injection skills</strong></CardTitle>
                    <CardText className="m-5" >In this application, we'll explain what SQL injection (SQLi) is, describe some common examples, explain how to find and exploit various kinds of SQL injection vulnerabilities.
                    </CardText>
                    <CardText>In these labs you will execute SQL injection on a H2 database in order to retrieve the desired informations. In the following challanges you will be given an objective to reach in the description of every level. 
                        On the levels you will be presented with the query to which you will need to append the injection to reach the goal. There will be hints on how to solve each level and also, with every level you will get the solution in case it is needed, but look at it just after
                        you gave it a try.
                    </CardText>
                    </div>
                    
                </Card>
                <div className="container" style={{ marginTop:"20px", paddingBottom:"100px"}}>
                         {this.state.fetchLevelsBool && this.handleFetchLevels()}
                            
                </div>
                
                
            </div>
        )
    }
}

export default UserContainer;