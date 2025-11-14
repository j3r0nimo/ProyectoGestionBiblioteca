import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Libreria from './pages/main'
import Contenidos from './pages/cont'
import Otra from './pages/otro'
import Formulario from './pages/formulario'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Libreria</Link> | {" "}
        <Link to="/contenidos">Contenidos</Link> | {" "}
        <Link to="/otro">otro</Link> | {" "}
        <Link to="/formulario">formulario</Link> | {" "}
      </nav>
      <Routes>
        <Route path='/' element={<Libreria/>}/>
        <Route path='/contenidos' element={<Contenidos/>}/>
        <Route path='/otro' element={<Otra/>}/>
        <Route path='/formulario' element={<Formulario/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
