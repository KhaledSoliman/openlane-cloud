import React, {Component} from 'react';
import {LazyLog, ScrollFollow} from 'react-lazylog';
import {hostname, port} from "Api/config";
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import Container from "@material-ui/core/Container";


const url = `ws://${hostname}:8080`;

class JobConsole extends Component {
    state = {
        text: 'meow\nmeow'
    };

    constructor(props) {
        super(props);

        this.props.user.getIdToken().then((idToken) => {
            const ws = new WebSocket('ws://localhost:8080', idToken);
            ws.onopen = () => {
                console.log(this.props.job);
            }
        });
    }

    render() {
        const {} = this.state;
        return (
            <
                ScrollFollow
                startFollowing={true}
                render={({follow, onScroll}) => (
                    <LazyLog
                        text={this.state.text}
                        height={700}
                        width={900}
                        enableSearch
                        follow={follow}
                        onScroll={onScroll}
                    />
                )}
            />
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps, {})(JobConsole);
