import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Item, Segment, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { deleteEvent } from '../eventActions';

export default function EventListItem({event}) {
    const dispatch = useDispatch();
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={event.hostPhotoURL}/>
                    </Item>
                    <Item.Content>
                        <Item.Header content={event.title} />
                        <Item.Description>
                            Hosted By {event.hostedBy}
                        </Item.Description>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{event.date}
                    <Icon name='marker' />{event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map( attendee => (
                         <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>
                    {event.description}
                </div>
                <Button color='red' floated="right" content='Delete' onClick={() => dispatch(deleteEvent(event.id))} />
                <Button color='teal' floated="right" content='View'  as={Link} to={`/events/${event.id}`} />
            </Segment>
        </Segment.Group>
    )
}