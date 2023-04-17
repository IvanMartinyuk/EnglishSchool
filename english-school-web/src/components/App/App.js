import './App.scss';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../HomePage/HomePage';
import About from '../About/About';
import Calendar from '../Calendar/Calendar';
import Tutors from '../Turors/Tutors';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Courses from '../Courses/Courses';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Router>
        <Routes>
            <Route forceRefresh={true} exact path="/" element={<Home/>} />
            <Route path="/r/:isRefresh" element={<Home/>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/calendar" element={<Calendar></Calendar>} />
            <Route path="/tutors" element={<Tutors></Tutors>} />
            <Route path="/login" element={<SignIn></SignIn>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/courses" element={<Courses></Courses>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
