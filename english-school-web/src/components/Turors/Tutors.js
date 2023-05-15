import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/userService';
import './Tutors.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { LessonService } from '../../services/lessonService';
import { useTranslation } from 'react-i18next';

const Tutors = () => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [tutor, setTutor] = useState();
  const [tutorNumber, setTutorNumber] = useState(1);
  const [tutorId, setTutorId] = useState(1);
  const [chooseClasses, setChooseClasses] = useState('collapse');
  const [chooseTutorText, setChooseTutorText] = useState(t('You must sign in before choosing tutor'));
  const [lessonClasses, setLessonClasses] = useState('collapse');
  const [lessonText, setLessonText] = useState(t('Meeting created'));
  
  const signInErrorText = t('You must sign in before choosing tutor');
  const errorClasses = 'alert alert-danger mt-4 text-center';
  const successfulChoosing = t('You have just choosen a tutor');
  const successfulClasses = 'alert alert-success mt-4 text-center';

  const lessonErrorText = t('Somethings went wrong. Meeting is not created');
  const lessonTimeErrorText = t('This time is not available');
  const lessonBeforeNowErrorText = t('The time cannot be before now');
  const noLessonsErrorText = t('You have to buy more classes to continue');
  const lessonSuccessfulText = t('Meeting created');

  useEffect(() => {
    let currentTime = new Date();
    let minutes = currentTime.getMinutes();
    currentTime.setMinutes(Math.ceil(minutes/10) * 10);
    setTime(currentTime);
    let userService = new UserService();
    userService.tutorList(1, 1).then(tutorList => {
      if(tutorList.length > 0) {
        setTutor(tutorList[0]);
      }
    });
  }, [])

  const handleTime = (changeTime) => {
    let minutes = changeTime.getMinutes();
    if (minutes % 10 === 1) 
      minutes = Math.ceil(minutes / 10) * 10;    
    else if (minutes % 10 === 9) 
      minutes = Math.floor(minutes / 10) * 10;    
    else 
      minutes = Math.round(minutes / 10) * 10;
    
    changeTime.setMinutes(minutes);
    setTime(changeTime);
  }

  const handleTutor = (changeNumber) => {
    if(tutorNumber + changeNumber > 0) {
      let currentNumber = tutorNumber + changeNumber;      
      let userService = new UserService();
      userService.tutorList(1, currentNumber).then(tutorList => {
        if(tutorList.length > 0) {
          console.log(tutorList)
          setTutorId(tutorList[0].id);
          setTutor(tutorList[0]);
          setTutorNumber(tutorNumber + changeNumber);
        }
      });
    }
  }

  const chooseTutor = () => {
    if(sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken").length > 0) {
      let userService = new UserService();
      console.log(tutorId)
      userService.setTutor(tutorId).then(resp => {
        if(resp.ok == true) {
          setChooseClasses(successfulClasses);
          setChooseTutorText(successfulChoosing);    
        }
      })
    }
    else {
      setChooseClasses(errorClasses);
      setChooseTutorText(signInErrorText);
    }
  }

  const createMeeting = () => {
    let choosedDate = date;
    choosedDate.setHours(time.getHours(), time.getMinutes(), 0)
    if(new Date() < choosedDate) {
        choosedDate = choosedDate.toISOString();
        console.log(choosedDate)
        let lessonService = new LessonService();
        let data = {
          date: choosedDate,
          topic: "",
          duration: 0
        }
        lessonService.generateLesson('Zoom', data).then(resp => {
          if(resp.ok == true) {
            setLessonClasses(successfulClasses);
            setLessonText(lessonSuccessfulText);
          }
          else {
            if(resp.status == 400) {
              setLessonClasses(errorClasses);
              setLessonText(lessonTimeErrorText);
            }
            else if(resp.status == 400) {
              setLessonClasses(errorClasses);
              setLessonText(lessonErrorText);
            }
            else {
              setLessonClasses(errorClasses);
              setLessonText(noLessonsErrorText);
            }
          }
        })
    }
    else {
      setLessonClasses(errorClasses);
      setLessonText(lessonBeforeNowErrorText);
    }
  }

  return (
    <div>
      <div className='d-flex'>
        <div className='column'>
          <div>
            <div className={chooseClasses}>{ chooseTutorText }</div>
            <h1 className='text-center'>{ t('Choose tutor') }</h1>
            
            <div className='d-flex gap-4'>
              <button className='d-flex align-items-center border-0 bg-white'
                      onClick={() => handleTutor(-1)}>
                <FontAwesomeIcon icon={faLeftLong} className='fs-1' />
              </button>

              {tutor && (<div className='bg-white rounded-3 tutor-card border border-2'>
                  <div>
                    <div className='tutor-card-img d-flex justify-content-center'>
                      <img src={tutor.image}
                          className='w-100 rounded-circle'></img>
                    </div>
                    <h4 className='m-3'>{tutor.name}</h4>
                    <div className='d-flex mb-2 justify-content-between'>
                      <b className=' text-center w-100'>{ t('Where I am from') }</b>
                      <div className='ms-2'>{ tutor.birthplace }</div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <b className=' text-center w-100'>{ t('My English level') }</b>
                      <div className='ms-2'>{ tutor.englishLevel }</div>
                    </div>
                  </div>
                </div> 
              )}
              <button className='d-flex align-items-center border-0 bg-white'
                      onClick={() => handleTutor(1)}>
                <FontAwesomeIcon icon={faRightLong} className='fs-1' />
              </button>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary' onClick={() => chooseTutor()}>{ t('Choose') }</button>
            </div>
          </div>
        </div>

        <div className='column'>
          <div>
            <div className={ lessonClasses }>{ lessonText }</div>

            <div className='d-flex'>
              <Calendar inline value={date} onChange={(e) => setDate(e.value)}  className='calendar'></Calendar>


              <div className='m-5'>
                <select class="form-select m-4 w-75" aria-label="Default select example">          
                  <option value="zoom">Zoom</option>
                  <option value="googleMeet">Google meet</option>
                </select>
                
                <div className='m-4'>
                  <Calendar inline timeOnly value={time} onChange={(e) => handleTime(e.value)}></Calendar>
                </div>
                
                <div className='d-flex justify-content-center m-4'>
                  <button className='btn btn-primary' onClick={() => createMeeting()}>{ t('Create meeting') }</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
