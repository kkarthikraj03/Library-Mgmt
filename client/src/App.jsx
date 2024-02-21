import React from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './components/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={ <Home /> } />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
