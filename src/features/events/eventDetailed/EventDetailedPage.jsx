import React from "react";
import { EventDetailedHeader } from './EventDetailedHeader';
import { EventDetailedInfo } from './EventDetailedInfo';
import { EventDetailedChat } from './EventDetailedChat';
import { EventDetailedSidebar } from './EventDetailedSidebar';
import { useParams } from 'react-router-dom';
import { Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function EventDetailedPage({match}) {
    let { id } = useParams();
    console.log('match is => ', id);
    const event = useSelector(state => state.root.event.events.find(e => e.id === id));

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event}></EventDetailedHeader>
                <EventDetailedInfo event={event} ></EventDetailedInfo>
                <EventDetailedChat></EventDetailedChat>
           </Grid.Column>
           <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees}></EventDetailedSidebar>
            </Grid.Column>
        
        </Grid>
        


    )
}