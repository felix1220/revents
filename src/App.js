import logo from './logo.svg';
import React from "react";
import './layout/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import EventDashboard from './features/events/eventDashboard/EventDashboard';
import NavBar from './features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import SignIn from './features/auth/SignIn';
import EventDetailedPage from './features/events/eventDetailed/EventDetailedPage';
import EventForm from './features/events/eventForm/EventForm';
import Sandbox from './features/sandbox/Sandbox';
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


function App() {
  const { key } = useLocation();
  return (

    <div>
      
          <ToastContainer position='bottom-right' theme='colored' hideProgressBar />
           <NavBar />
           <Container className='main'>
            <Routes>
            
            <Route exact path='/' element={<SignIn />} />
             
               <Route exact path='events' element={<EventDashboard />} />
               <Route exact path='sandbox' element={<Sandbox />} />
               <Route exact path='signin' element={<SignIn />} />
               <Route path='/events/:id' element={<EventDetailedPage />} />
               <Route path='/createEvent' element={<EventForm />} />
               <Route path='/manage/:id' element={<EventForm />} key={key} />
              
           
             </Routes>
             </Container>
    
        
    </div>
  );
}

export default App;
