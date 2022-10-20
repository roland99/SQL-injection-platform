import React from 'react';

import backImg from '../commons/images/1.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';


class Home extends React.Component {

    constructor(props){
        super(props);
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    buttonHandler(){
        if(sessionStorage.getItem("loggedIn") === "true"){
            window.location.href="/user";
        }else{
            window.location.href="/login";
        }
    }

/* style={backgroundStyle} */
    render() {

        return (

            <div style={{position: "relative",
                        maxWidth: "100%",
                        margin: "0 auto"}}>
                
                <img src={backImg} width="100%"></img>
                    <Container fluid style={{position: "absolute",
                        bottom: "0",
                        background: "rgb(0, 0, 0)", /* Fallback color */
                        background: "rgba(0, 0, 0, 0.5)", /* Black background with 0.5 opacity */
                        color:"#f1f1f1",
                        width: "100%",
                        padding: "20px"}}>
                        
                        
                        <p className="lead"  style={{margin: "auto"}}> <b>An introduction to SQL injection mechanisms for newbies</b> </p>
                        <hr className="my-2"/>
                        <p  > <b>This is a laboratory for learning SQL injection techniques on an incremental model. This challange is built on
                            multiple leveles of difficulty with theoretical explanations and guides for solving every level. </b> </p>
                        
                        <div class="text-center">
                        <Button className="btn btn-info m-2" style={{margin: "auto"}} onClick={() => {this.buttonHandler();}}>
                            Start the levels
                        </Button>
                        </div>
                    </Container>
 
            </div>
            
        )
    };
}

export default Home
