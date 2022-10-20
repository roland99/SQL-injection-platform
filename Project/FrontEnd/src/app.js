import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import UserContainer from './user/user-container';
import Login from './user/login';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import UserRegister from './user/register';
import GenerateCodeComponent from './user/generateCode';
import PasswordReset from './user/passwordReset';
import AdminContainer from './commons/admin/admin-container';
import Level1 from './levels/level1';
import Level2 from './levels/level2';
import Level3 from './levels/level3';
import Level4 from './levels/level4';
import Level5 from './levels/level5';
import Level6 from './levels/level6';
import Level7 from './levels/level7';
import Level8 from './levels/level8';


class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />


                        <Route
                            exact
                            path='/user'
                            render={() => <UserContainer/>}
                        />

                        {sessionStorage.getItem("isAdmin") === "true" && <Route
                            path='/admin'
                            render={() => <AdminContainer/>}
                        />}

                        <Route 
                            path="/login" 
                            render={() => <Login/>} 
                        />

                        <Route 
                            path="/register" 
                            render={() => <UserRegister/>} 
                        />
                        
                        <Route
                            path="/generateCode"
                            render={() => <GenerateCodeComponent/>}
                        />

                        <Route
                            path="/resetPassword"
                            render={() => <PasswordReset/>}
                        />
                    
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        
                        <Route
                            path="/level1"
                            render={() => <Level1/>}
                        />

                        <Route
                            path="/level2"
                            render={() => <Level2/>}
                        />

                        <Route
                            path="/level3"
                            render={() => <Level3/>}
                        />

                        <Route
                            path="/level4"
                            render={() => <Level4/>}
                        />

                        <Route
                            path="/level5"
                            render={() => <Level5/>}
                        />

                        <Route
                            path="/level6"
                            render={() => <Level6/>}
                        />

                        <Route
                            path="/level7"
                            render={() => <Level7/>}
                        />

                        <Route
                            path="/level8"
                            render={() => <Level8/>}
                        />

                    

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
