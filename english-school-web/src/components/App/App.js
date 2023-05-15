import './App.scss';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../HomePage/HomePage';
import About from '../About/About';
import CalendarDemo from '../Calendar/Calendar';
import Tutors from '../Turors/Tutors';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Courses from '../Courses/Courses';
import SuccessfulPayment from '../SuccessfulPayment/SuccessfulPayment';
import CancelPayment from '../CancelPayment/CancelPayment';
import ChangePassword from '../ChangePassword/ChangePassword';
import TestIntroduction from '../TestIntroduction/TestIntroduction';
import Test from '../Test/Test';
import TestResult from '../TestResult/TestResult';
import { useEffect } from 'react';
import Chat from '../Chat/Chat';
import ChatList from '../ChatList/ChatList';

function App() {
  useEffect(() => {
    if(!sessionStorage.getItem('currentLanguage'))
      sessionStorage.setItem('currentLanguage', 'en');
  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <Router>
        <Routes>
            <Route forceRefresh={true} exact path="/" element={<Home/>} />
            <Route path="/r/:isRefresh" element={<Home/>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/calendar" element={<CalendarDemo></CalendarDemo>} />
            <Route path="/tutors" element={<Tutors></Tutors>} />
            <Route path="/login" element={<SignIn></SignIn>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/changePassword" element={<ChangePassword></ChangePassword>} />
            <Route path="/courses" element={<Courses></Courses>} />
            <Route path="/successfulPayment/:courseId" element={<SuccessfulPayment></SuccessfulPayment>} />
            <Route path="/cancelPayment" element={<CancelPayment></CancelPayment>} />
            <Route path='/testIntroduction' element={<TestIntroduction></TestIntroduction>}></Route>
            <Route path='/test' element={<Test></Test>}></Route>
            <Route path='/test/:level' element={<TestResult></TestResult>}></Route>
            <Route path='/chatList' element={<ChatList></ChatList>}></Route>
            <Route path='/chat' element={<Chat></Chat>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
