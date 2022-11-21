import cuid from "cuid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent} from '../eventActions';

export default function EventForm() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [, updateState] = useState();
    let { id } = useParams();

    const selectedEvent = useSelector(state => state.root.event.events.find(e => e.id === id));

    const initialValues = selectedEvent ?? {
        title: '',
        category:'',
        description: '',
        city:'',
        venue:'',
        date:''
    }
    const [values, setValues] = useState(initialValues);

    function handleFormSubmit() {
        console.log(values);
        selectedEvent ? dispatch(updateEvent({...selectedEvent, ...values})) : dispatch(createEvent({...values, id: cuid(), hostedBy: 'Bob', attendees: [], hostPhotoURL:'/assets/user.png' }));
        history('/events');
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }
    function loadImageSample() {
        let img = new Image();
        img.src = '/assets/emoji-sheet.png';
        img.onload = () => {
            //imgData = data;
            console.log('Sprite sheet loaded!!!')
           
        }
    }

    loadImageSample();
    
    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit Event' : 'Create new Event' } />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input type='text' placeholder="Event Title" value={values.title} onChange={(e) => handleInputChange(e)} name='title' />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder="Category"  value={values.category} onChange={(e) => handleInputChange(e)} name='category' />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder="Description"  value={values.description} onChange={(e) => handleInputChange(e)} name='description' />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder="City"  value={values.city} onChange={(e) => handleInputChange(e)} name='city' />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder="Venue"  value={values.venue} onChange={(e) => handleInputChange(e)} name='venue' />
                </Form.Field>
                <Form.Field>
                    <input type='date' placeholder="Date"  value={values.date} onChange={(e) => handleInputChange(e)} name='date' />
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='submit' floated='right' content='Cancel' as={Link} to='events' />
            </Form>
        </Segment>
    )
}