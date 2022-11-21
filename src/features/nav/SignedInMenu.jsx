import React from "react";
import {  Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default function SignedInMenu({signedOut}) {

    return (
        <Menu.Item position="right">
            <Image avatar spaced='right' src='/assets/user.png' />
            <Dropdown pointing='top left' text='Bob'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
                    <Dropdown.Item  text='Profile' icon='user' />
                    <Dropdown.Item text='Sign Out' icon='power' onClick={() => signedOut() }/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}