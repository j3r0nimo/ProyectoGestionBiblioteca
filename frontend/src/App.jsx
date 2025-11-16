import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Libreria from './pages/main'
import Formulario from './pages/formulario'
import LibroDetalle from './pages/detalle'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">LIBRERIA</Link>
        <Link to="/formulario">AÑADIR</Link>

      </nav>
      <Routes>
        <Route path='/' element={<Libreria />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path="/formulario/editar/:id" element={<Formulario />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
