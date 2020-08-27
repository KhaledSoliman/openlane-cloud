import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";


class EnhancedTable extends Component {
    state = {
        rows: [],
        selected: [],
        order: '',
        orderBy: '',
        page: 0,
        rowsPerPage: 10,
    };

    componentDidMount() {
        this.setState({
            rows: this.props.rows
        })
    }

    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = this.state.rows.map((n) => n.id);
            this.setState({
                selected: newSelecteds
            });
            return;
        }

        this.setState({
            selected: []
        });
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({
            selected: newSelected
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    rowOptions() {
        const {sorting, pagination} = this.props;
        const {rows, order, orderBy, page, rowsPerPage} = this.state;
        let tableRows = rows;
        if (sorting)
            tableRows = this.stableSort(tableRows, this.getComparator(order, orderBy));

        if (pagination)
            tableRows = tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        return tableRows;
    }

    render() {
        const {tableTitle, checkBoxes, sorting, pagination, fields} = this.props;
        const {
            rows, order, orderBy, page, rowsPerPage, selected
        } = this.state;
        return (
            <div>
                <TableContainer>
                    <Table
                        stickyHeader
                        aria-labelledby='tableTitle'
                        size="small"
                        aria-label={tableTitle}
                    >
                        <TableHead>
                            <TableRow>
                                {checkBoxes && <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                        checked={rows.length > 0 && selected.length === rows.length}
                                        onChange={this.handleSelectAllClick}
                                        inputProps={{'aria-label': 'select all jobs'}}
                                    />
                                </TableCell>
                                }
                                {fields.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        {sorting && <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={(e) => this.handleRequestSort(e, headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rowOptions().map((row, index) => {
                                const isItemSelected = this.isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        {checkBoxes &&
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => this.handleClick(event, row.id)}
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        }
                                        {fields.map((cell, i) => (
                                            <TableCell key={i}>
                                                {cell.jsx ? cell.jsx(row, this.props) : cell.timestamp ? row[cell.id] ? new Date(row[cell.id]).toLocaleString() : 'N/A' : row[cell.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination && <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                    colSpan={3}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {'aria-label': 'rows per page'},
                        native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                }
            </div>
        );
    }
}


// map state to props
const mapStateToProps = ({settings}) => {
    return settings;
};

export default withRouter(connect(mapStateToProps, {})(EnhancedTable));


