import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Libreria from './pages/main'
import Otra from './pages/otro'
import Formulario from './pages/formulario'
import LibroDetalle
 from './pages/detalle'
function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Libreria</Link> | {" "}
        <Link to="/otro">otro</Link> | {" "}
        <Link to="/formulario">formulario</Link> | {" "}
        
      </nav>
      <Routes>
        <Route path='/' element={<Libreria/>}/>
        <Route path='/otro' element={<Otra/>}/>
        <Route path='/formulario' element={<Formulario/>}/>
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
