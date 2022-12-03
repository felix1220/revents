import React, { useContext} from "react";
import {  Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { signOutUser } from "../../config/firebase";
import { UserContext } from "../../contexts/user.context";

export default function SignedInMenu({signedOut}) {
    const { setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);

  }
    return (
        <Menu.Item position="right">
            <Image avatar spaced='right' src='/assets/user.png' />
            <Dropdown pointing='top left' text='Bob'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
                    <Dropdown.Item  text='Profile' icon='user' />
                    <Dropdown.Item text='Sign Out' icon='power' onClick={signOutHandler}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}