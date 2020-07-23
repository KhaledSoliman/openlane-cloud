import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, {FirebaseContext} from './services/firebase';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App/>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker
//             .register("/sw.js")
//             .then(registration => {
//                 console.log("SW registered: ", registration);
//             })
//             .catch(registrationError => {
//                 console.log("SW registration failed: ", registrationError);
//             });
//     });
// }
