import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/configureStore';
import { loadEvents } from './features/events/eventActions';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

const store = setupStore();

store.dispatch(loadEvents());
console.log('State is => ', store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
     <BrowserRouter>
        <UserProvider>
           <CategoriesProvider>
            <CartProvider>
                <App />
            </CartProvider>
           </CategoriesProvider>
        </UserProvider>  
      </BrowserRouter>
    </Provider>
   
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
