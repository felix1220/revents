import React, {useEffect} from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../layout/LoadingComponent";
import EventFilters from "./EventFilters";
import { dataFromSnapshot, getEventsFromFirestore } from "../../../firestore/firestoreService";

export default function EventDashboard(){
    //const [events, setEvents] = useState(sampleData)
    const { events }  =  useSelector(state => state.root.event);
    const loading = useSelector(state => state.root.async.loading);
    useEffect(() => {
        const unsubscribe = getEventsFromFirestore({
            next: snapshot => console.log(snapshot.docs.map(docSnapShot => dataFromSnapshot(docSnapShot))),
            error: error => console.log(error)
        })
        return unsubscribe;
    })
    if(loading) return <LoadingComponent />
    
    return (
        <Grid>
            <Grid.Column width={10}>
               <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventFilters />
            </Grid.Column>
        </Grid>
    )
}