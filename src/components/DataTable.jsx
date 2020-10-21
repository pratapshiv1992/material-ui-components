import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import LoadMore from './LoadMore';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        width: "90%",
        margin: "auto",
        // height: "88vh"
    },
    columnHeader: {
        fontWeight: '600'
    }

});

function DataTable(props) {
    const {columns = [], rowData = [], firstLoad, onLoadMore, error} = props;
    const classes = useStyles();



    return (
        <Paper className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column, i) => {
                                    return <TableCell
                                        key={`${column.name}+${i}`}
                                        align="left"
                                        className={classes.columnHeader}
                                    >
                                        {column.name}
                                        <ArrowDropUp/>
                                    </TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.map((row, i) => (
                            <TableRow key={`${row.id}+${i}`}>
                                <TableCell component="th" scope="row">
                                    {row.created_at}
                                </TableCell>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.old_value}</TableCell>
                                <TableCell align="left">{row.new_vlaue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <LoadMore onLoadMore={onLoadMore} error={error} />
        </Paper>
    );
}

export default DataTable;