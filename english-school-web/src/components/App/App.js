import './App.css';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../HomePage/HomePage';
import Courses from '../Courses/Courses';
import Calendar from '../Calendar/Calendar';
import Tutors from '../Turors/Tutors';
import Login from '../Login/Login';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Router>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/courses" element={<Courses></Courses>} />
            <Route path="/calendar" element={<Calendar></Calendar>} />
            <Route path="/tutors" element={<Tutors></Tutors>} />
            <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
