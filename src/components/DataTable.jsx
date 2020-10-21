import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import LoadMore from './LoadMore';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        width: "90%",
        margin: "auto"
    },
    columnHeader: {
        fontWeight: '600'
    }

});

function DataTable(props) {
    let {columns = [], rowData = [], onLoadMore, error} = props;
    const [sortingOrder, setSortingOrder] = useState('ASC');
    const classes = useStyles();

    const handleSorting = () => {
        const order = sortingOrder == 'ASC' ? 'DESC' : 'ASC';
        rowData = rowData.reverse();
        setSortingOrder(order);
    }

    return (
        <Paper className={classes.root} data-testid='data_table_root'>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" data-testid='data_table'>
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
                                        {column.sorting && (sortingOrder == 'ASC' ?
                                            <ArrowDropDownIcon onClick={handleSorting}/> :
                                            <ArrowDropUpIcon onClick={handleSorting}/>)
                                        }
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
            <LoadMore onLoadMore={onLoadMore} error={error}/>
        </Paper>
    );
}

export default DataTable;