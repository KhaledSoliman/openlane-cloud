import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Button} from '@material-ui/core';
import {SearchInput} from 'components';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    },
    addButton: {
        boxShadow: 'none',
        color: 'black',
        '&:hover': {
            boxShadow: 'none'
        },
    },
});

class JobsToolbar extends React.Component {
    constructor(props) {
        super(props);
        const self = this;
    }

    render() {
        const {classes, handleAddJobOpen} = this.props;
        return (
            <div>
                <div className={classes.row}>
                    <span className={classes.spacer}/>
                    <Button className={classes.importButton} disabled>Import</Button>
                    <Button className={classes.exportButton} disabled>Export</Button>
                    <Button
                        color="primary"
                        className={classes.addButton}
                        variant="contained"
                        onClick={() => handleAddJobOpen()}
                    >
                        Add Job
                    </Button>
                </div>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search Job"
                    />
                </div>
            </div>
        );
    };
}

JobsToolbar.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(JobsToolbar);
