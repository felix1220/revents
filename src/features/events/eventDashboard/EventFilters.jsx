import React from "react";
import { Calendar } from "react-calendar";
import { Menu, Header, MenuItem } from 'semantic-ui-react';
export default function EventFilters() {
    return(
        <div>
            <Menu vertical size='large' style={{width:'100%'}}>
                <Header icon="filter" attached color='teal' content='Filters' />
                <Menu.Item content='All Events' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header icon='calendar' attached color='teal' content='Select date' />
            <Calendar />

        </div>
    )
}