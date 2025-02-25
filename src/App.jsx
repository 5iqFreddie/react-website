import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CreateProject from './pages/CreateProject'
import ListProject from './pages/ListProject'
import UpdateProject from './pages/UpdateProjectById'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/projects/create' element={<CreateProject />} />
        <Route path='/projects/List' element={<ListProject />} />
        <Route path='/projects/update/:id' element={<UpdateProject />} />
        <Route path='/' element={<ListProject />} /> 
      </Routes>
    </BrowserRouter>

  )
}

export default App
