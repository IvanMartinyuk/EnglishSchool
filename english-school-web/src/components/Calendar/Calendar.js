import React, { useEffect, useState } from 'react';
import './Calendar.scss'
import { LessonService } from '../../services/lessonService';

const lessonService = new LessonService();

const CalendarDemo = () => {
    const [prevLessons, setPrevLessons] = useState([]);
    const [prevPage, setPrevPage] = useState(1);
    const [isPrevALot, setIsPrevALot] = useState(false);
    const [futureLessons, setFutureLessons] = useState([]);
    const [futurePage, setFuturePage] = useState(1);
    const [isFutureALot, setIsFutureALot] = useState(false);
    let prevCount = 0;
    let futureCount = 0;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const pageCount = 5;

    useEffect(() => {
      if(sessionStorage.getItem("isLoaded"))
        sessionStorage.removeItem("isLoaded");
      else {
        lessonService.studentFutureLessonsCount().then(count => {
          futureCount = count;
          lessonService.studentFutureLessons(futurePage).then(data => {
            loadFuture(data);
            lessonService.studentPrevLessonsCount().then(count => {
              prevCount = count;
              lessonService.studentPrevLessons(prevPage).then(data => {
                loadPrev(data);
              })
            })
          })
        })
        
        sessionStorage.setItem("isLoaded", true)  
      }
    }, [])

    const loadPrev = (data) => {
      setIsPrevALot(prevCount > pageCount * prevPage);
      let array = prevLessons;
      data.forEach(item => {
        array.push(item);
      })
      setPrevLessons(array);
    }
    
    const loadFuture = (data) => {
      setIsFutureALot(futureCount >= pageCount * futurePage);
      let array = futureLessons;
      data.forEach(item => {
        array.push(item);
      })
      setFutureLessons(array);
    }

    const loadMorePrev = () => {
      let lessonService = new LessonService();
      lessonService.studentPrevLessons(prevPage + 1).then(data => {
        loadPrev(data);
      });
      setPrevPage(prevPage + 1);
    }
    
    const loadMoreFuture = () => {
      let lessonService = new LessonService();
      lessonService.studentFutureLessons(futurePage + 1).then(data => {
        loadFuture(data);
      });
      setFuturePage(futurePage + 1);
    }

    const cancelMeeting = (event) => {
      let id = event.target.name;
      let lessonService = new LessonService();
      lessonService.deactivateLesson(id).then(resp => {
        if(resp.ok == true)
        {
          console.log('reload')
          reloadLessons();
        }
      })
    }

    const reloadLessons = () => {
      setPrevPage(1);
      setFuturePage(1);

      lessonService.studentFutureLessonsCount().then(count => {
        futureCount = count;
        lessonService.studentFutureLessons(1).then(data => {
          setIsFutureALot(futureCount >= pageCount);
          setFutureLessons(data);
          lessonService.studentPrevLessonsCount().then(count => {
            prevCount = count;
            lessonService.studentPrevLessons(1).then(data => {
              setIsPrevALot(prevCount > pageCount);
              setPrevLessons(data);
            })
          })
        })
      })

      
    }

    return (
      <div className='p-4 d-flex flex-wrap gap-5 justify-content-center'>
        <div>
          <h2 className='text-center'>Previous lessons</h2>
          <div className='lessonsActiveColumn'>
            

            { prevLessons.map(lesson => {
              let date = new Date(lesson.date);
              const dateString = date.toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return(
                <div class="lessonCard card text-center ">
                  <div class="d-flex align-items-center justify-content-center h-100">
                    <div>
                      <h5 class="card-title fw-bold">{ daysOfWeek[date.getDay()] }</h5>
                      <p class="card-text">
                        <b>{ dateString }</b>
                        <div className='d-flex justify-content-center mt-1'>
                          <div className='me-3'>Tutor:</div>
                          <div>{ lesson.tutor.userName }</div>
                        </div>
                        <div className='d-flex justify-content-center mt-1'>
                          <div className='me-3 fw-bold'>Was canceled?:</div>
                          <div>{ lesson.isActive ? 'No' : 'Yes' }</div>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
            }

            { isPrevALot &&
              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={() => loadMorePrev()}>Load more</button>
              </div> 
            }
          </div>
        </div>
        <div className='verticaLine'></div>

        <div>
          <h2 className='text-center'>Future lessons</h2>
          <div className='ms-5 lessonsActiveColumn'>
            

            { futureLessons.map(lesson => {
              let date = new Date(lesson.date);
              const dateString = date.toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return(
                <div class="lessonCard card text-center ">
                  <div class="d-flex align-items-center justify-content-center h-100">
                    <div>
                      <h5 class="card-title fw-bold">{ daysOfWeek[date.getDay()] }</h5>
                      <p class="card-text">
                        <b>{ dateString }</b>
                        <div className='d-flex justify-content-center mt-1'>
                          <div className='me-3'>Tutor:</div>
                          <div>{ lesson.tutor.userName }</div>
                        </div>
                      </p>
                      <div className='d-flex justify-content-center gap-3'>
                        <button className='btn btn-danger' name={ lesson.id } onClick={(e) => {cancelMeeting(e)}}>Cancel</button>
                        <a href={ lesson.meetingJoinUrl } className='btn btn-primary' target="_blank">Go to lesson</a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
            }

            { isFutureALot &&
              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={() => loadMoreFuture()}>Load more</button>
              </div> 
            }
          </div>
        </div>
      </div>
    );
}
                 
export default CalendarDemo;