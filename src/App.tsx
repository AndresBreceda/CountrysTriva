import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';

//components


function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* Definir las rutas */}
          <Route path="/" element={<Home />} />

          {/* Ruta para páginas no encontradas */}
          {/* <Route path="*" element={<NotFound />} /> */} 
        </Routes>
      </Router>
    </div>
  )
}

export default App