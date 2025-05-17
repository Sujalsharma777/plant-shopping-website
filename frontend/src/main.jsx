
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./context/ProductContext.jsx"
import { FilterContextProvider } from "./context/FilterContext.jsx"
import { CartProvider } from './context/CartContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AppProvider>

        <FilterContextProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </FilterContextProvider>
    </AppProvider>




);