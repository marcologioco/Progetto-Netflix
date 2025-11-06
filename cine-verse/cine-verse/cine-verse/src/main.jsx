import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'; 
import Home from './pages/Home.jsx';
 

const router = createBrowserRouter([{ path: '/', element: <App />, 
    children: [{ index: true, element: <Home /> }] }]); 

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);