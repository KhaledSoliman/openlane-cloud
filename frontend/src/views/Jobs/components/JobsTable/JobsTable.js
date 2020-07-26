import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Card,
    IconButton,
    Grid,
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import GetAppIcon from '@material-ui/icons/GetApp';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    }
});

const options = {
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
};

class JobsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        setSelectedJobs: [],
        setRowsPerPage: 10,
        setPage: 0,

    };


    render() {
        const {jobs, handleConsoleClick} = this.props;
        return (
            <Card>
                <PerfectScrollbar>
                    <div>
                        <MUIDataTable
                            data={jobs}
                            columns={[
                                {
                                    name: "id",
                                    label: "Job ID",
                                    options: {
                                        searchable: true,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "designName",
                                    label: "Design Name",
                                    options: {
                                        searchable: true,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "repoURL",
                                    label: "Repository URL",
                                    options: {
                                        searchable: true,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "status",
                                    label: "Status",
                                    options: {
                                        searchable: false,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "createdAt",
                                    label: "Submission Time",
                                    options: {
                                        searchable: false,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "completion",
                                    label: "Completion Time",
                                    options: {
                                        filter: true,
                                        sort: false,
                                    }
                                },
                                {
                                    name: "Actions",
                                    options: {
                                        filter: false,
                                        sort: false,
                                        empty: true,
                                        setCellHeaderProps: () => ({style: {justifyContent: 'center'}}),
                                        customBodyRenderLite: (dataIndex) => {
                                            return (
                                                <>
                                                    <GetAppIcon/>
                                                    <WebAssetIcon onClick={() => handleConsoleClick()}/>
                                                </>
                                            );
                                        }
                                    }
                                },
                            ]}
                            options={options}
                        />
                    </div>
                </PerfectScrollbar>
            </Card>
        );
    }
};


export default withStyles(styles)(JobsTable);
