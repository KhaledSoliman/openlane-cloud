import React, {Component} from 'react';
import {LazyLog, ScrollFollow} from 'react-lazylog';
import {hostname, port} from "Api/config";
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import Container from "@material-ui/core/Container";


class JobConsole extends Component {
    state = {
        text: 'Starting stream...\n'
    };

    constructor(props) {
        super(props);
        const url = `ws://${hostname}:8080`;
        this.props.user.getIdToken().then((idToken) => {
            const ws = new WebSocket(url, idToken);
            ws.onopen = () => {
                console.log(this.props.job);
            };
            ws.onmessage = (message) => {
                console.log(message);
                this.setState({
                    text: this.state.text + message.data
                })
            };
        });
    }

    render() {
        const {} = this.state;
        return (
            <ScrollFollow
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
