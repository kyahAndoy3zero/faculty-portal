import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./pages/Register";
import LogIn from "./pages/LogIn"
import Dashboard from "./pages/Dashboard";
import {ModalProvider} from "./Modal/ModalContext/ModalContext"
import Students from "./pages/Students"
import { useSelector } from 'react-redux'
import AppBar from './components/AppBar'

function App() {
  const { user } = useSelector((state) => state.auth)
 
  return (

    <Router>
      <ModalProvider>
      {user && <AppBar/>}
      <Routes>
        <Route exact path = '/' element={<Dashboard/>}/>
        <Route path = '/login' element={<LogIn/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/students/room/:id' element={<Students/>}/>
      </Routes>
      </ModalProvider>
    </Router>
  
  );
}

export default App;
