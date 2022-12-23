import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react';
import {  increment, decrement } from './testReducer';
import MockComponent from './mockComponent';

export default function Sanbox() {
    const [target, setTarget] = useState(null);
    const data = useSelector(state => state.root.test.data)
    const dispatch = useDispatch();
    const loading = useSelector(state => state.root.async.loading);
    console.log('Loading is => ', loading);

    return(
        <div>
            <MockComponent width='700' height='700'></MockComponent>
            <h1>Testing 123</h1>
            <h3>The data is: {data} </h3>
            <Button content='Increment' color='green' onClick={(e) => 
                {
                    dispatch(increment(10));
                    setTarget(e.target.name);
                }} 
                loading={loading && target === 'increment'} 
                name='increment' />
            <Button content='Decrement' color='red' onClick={(e) => 
                {
                    dispatch(decrement(5));
                    setTarget(e.target.name);
                }} 
                loading={loading && target === 'decrement'} 
                name='decrement' />
        </div>
    )
}