import React from 'react';
import 'react-notifications/lib/notifications.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {NotificationContainer} from 'react-notifications';

import SignInModal from "./src/views/Home/components/SignIn/SignIn";
import Home from "../openlane-cloud/src/pages/Home"
import {amber, grey} from "@material-ui/core/colors";
import * as ROUTES from './constants/routes';


const theme = createMuiTheme({
    palette: {
        primary: amber,
        secondary: grey
    },
});


class App extends React.Component {
    state = {
        authenticated: localStorage.getItem('isAuthenticated') === 'true'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NotificationContainer/>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <div className="App">
                            <Route path={ROUTES.LANDING} exact component={Home}/>
                            <Route path="/signin" component={SignInModal}/>
                        </div>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        );
    }
}


export default App;
