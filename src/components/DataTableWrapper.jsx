import React, {useEffect, useState} from 'react';
import DataTable from "./DataTable";
import callAPi from '../utils/apiClient';
import {sorByDate} from '../utils/randomData'

const DataTableWrapper = (props) => {
    const {columns, apiConfig: {path, method, data} = {}, type, size} = props;
    const [list, setList] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        callAPi(path, method, data, size, type).then((response) => {
            if (response.result) {
                setList(response.result);
            } else {
                alert('something went wrong.')
            }
        });
    }, []);

    const onLoadMore = (e) => {
        if (firstLoad) {
            setFirstLoad(false);
            callAPi(path, method, data, 2, type).then((response) => {
                if (response.result) {
                    const newList = [...list, ...response.result];
                    const sortedNewList = sorByDate(newList)
                    setList(sortedNewList);
                } else {
                    alert('something went wrong.')
                }
            });
        } else {
            setTimeout(() => {
                setError(true);
            }, 2000);
        }
    }

    return <DataTable
        columns={columns}
        rowData={list}
        firstLoad={firstLoad}
        onLoadMore={onLoadMore}
        error={error}
    />
}

export default DataTableWrapper;