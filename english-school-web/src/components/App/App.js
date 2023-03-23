import './App.css';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../HomePage/HomePage';
import Courses from '../Courses/Courses';
import Calendar from '../Calendar/Calendar';
import Tutors from '../Turors/Tutors';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

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
            <Route path="/login" element={<SignIn></SignIn>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
