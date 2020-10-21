import React from 'react';
import {render} from '@testing-library/react';
import LoadMore from './components/LoadMore';
import DataTableWrapper from './components/DataTableWrapper';
import {projectTableHeaders, userTableHeaders} from "./utils/tableConfg";

const userApiConfig = {path:'/users', method:'get', data:{}}
const projectsApiConfig = {path:'/users', method:'get', data:{}}

test('render LoadMore component with error', () => {
    const {getByText} = render(<LoadMore error={true}/>);
    const errorText = getByText('We had problems fetching your data. Please try again.');
    expect(errorText).toBeInTheDocument();
});

test('render LoadMore component with showLoader true', () => {
    const {getByText, getByTestId} = render(<LoadMore isLoading={true}/>);
    const circularProgressElement = getByTestId('circular_progress');
    expect(circularProgressElement).toBeInTheDocument();
});


test('render LoadMore component with showLoader false', () => {
    const {getByText, getByTestId} = render(<LoadMore/>);
    const laodMoreElement = getByTestId('load_more_btn');
    expect(laodMoreElement).toBeInTheDocument();
});


test('render DataTableWrapper component with user data', () => {
    const {getByTestId} = render(
        <DataTableWrapper
            columns={userTableHeaders}
            apiConfig={userApiConfig}
        />);
    const rootDataTable = getByTestId('data_table_root');
    const dataTable = getByTestId('data_table_root');
    expect(rootDataTable).toBeInTheDocument();
    expect(dataTable).toBeInTheDocument();
});

test('render DataTableWrapper component with project data', () => {
    const {getByTestId} = render(
        <DataTableWrapper
            columns={projectTableHeaders}
            apiConfig={projectsApiConfig}
            type='projects'
        />);
    const rootDataTable = getByTestId('data_table_root');
    expect(rootDataTable).toBeInTheDocument();
});

