import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Libreria from './pages/main'
import Contenidos from './pages/cont'
import Otra from './pages/otro'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Libreria</Link> | {" "}
        <Link to="/contenidos">Contenidos</Link> | {" "}
        <Link to="/otro">otro</Link> | {" "}
      </nav>
      <Routes>
        <Route path='/' element={<Libreria/>}/>
        <Route path='/contenidos' element={<Contenidos/>}></Route>
        <Route path='/otro' element={<Otra/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
