import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import AddFault from './components/AddFault';
import EditPanel from './components/EditPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/home' element={<Dashboard />} ></Route>
        <Route path='/admin' element={<Admin />} ></Route>
        <Route path='/add' element={<AddFault />} ></Route>
        <Route path='/edit' element={<EditPanel />} ></Route>
        <Route path='*' element={<NotFound />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
