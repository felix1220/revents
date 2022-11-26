import React, { useState, useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink, useNavigate } from 'react-router-dom'
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { UserContext } from "../../contexts/user.context";

export default function NavBar(){
    const { currentUser } = useContext(UserContext);
    const [authenticated, setAuthenticated ] = useState(false);
    const navigate = useNavigate();

    function handleSignOut(){
        setAuthenticated(false);
        navigate('/')
    }
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}} />
                    Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to='events' name='Events' />
                <Menu.Item as={NavLink} to='sandbox' name='Sandbox' />
                <Menu.Item as={NavLink} to='signin' name='Sign Up Form' />
                { authenticated && 
                <Menu.Item as={NavLink} to='createEvent'>
                    <Button positive inverted content='Create Event' />
                </Menu.Item>
                }
                { authenticated ?<SignedInMenu signedOut={handleSignOut} /> :   <SignedOutMenu setAuthenticated={setAuthenticated}/>}
            </Container>
        </Menu>
    )
}