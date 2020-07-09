import React from 'react';
import 'react-notifications/lib/notifications.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {NotificationContainer} from 'react-notifications';

import SignInModal from "./components/SignInModal";
import Home from "./pages/Home"
import amber from "@material-ui/core/colors/amber";
import * as ROUTES from './constants/routes';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: amber,
        background: {
            container: '#0a0a0a',
            paper: '#1a1a1a',
            default: "#0a0a0a"
        }

    },
});

//todo::Carasol
//todo::LoginModal
//todo::firebase integration
//todo::job submission

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
