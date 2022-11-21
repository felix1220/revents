import React from "react";
import { Segment, Header, Image, Container, Button, Icon} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

export default function HomePage() {

    //const history = useHistory();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' style={{marginBottom: 12}} />
                    Re-vents
                </Header>
                <Button size='huge' inverted as={NavLink} to='events'>
                    Get Started
                    <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    )
}