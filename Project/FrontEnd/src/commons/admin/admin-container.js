import React from 'react';
import { Card, CardHeader, CardTitle } from 'reactstrap';

class AdminContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoaded: false
        };
    }


    componentDidMount(){
        this.setState({
            isLoaded: true,
            name: sessionStorage.getItem("name"),
            id: sessionStorage.getItem("userId")
        })

    }
    

    render(){
        return(
            <div>
                <CardHeader>
                    <strong> Admin Page !</strong>
                </CardHeader>
                <Card>
                    <CardTitle>Actions</CardTitle>
                </Card>
                
            </div>
        )
    }
}

export default AdminContainer;