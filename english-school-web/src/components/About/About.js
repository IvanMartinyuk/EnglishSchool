import React, { useEffect, useState } from 'react';
import './About.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';import { UserService } from '../../services/userService';

const About = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    let userService = new UserService();
    userService.tutorList().then(data => {
      setTutors(data);
    })
  }, [])

  return (
    <div className='text-center'>
      <div className='courses-line'>
        <div className='w-100 h-100'>
          <img src='https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/english-section-hero-desktop-1.png.webp'
              className='w-100 h-100 object-fit'></img>
        </div>
        <div className='courses-line d-flex align-items-center course-line-body justify-content-start w-50 text-start'>
          <div className='bg-transparent m-5'>
            <h1 className='bg-transparent w-75 text-start'>Learn English as a second language</h1>
            <div className='bg-transparent w-75 text-wrap text-start'>With professional teachers, flexible learning schedules and courses for all levels, our live, online classes will have you speaking confidently in no time.</div>
            <div className='w-75 d-flex justify-content-center'>
              <a href='/prices' className='btn btn-primary m-2 fs-4'>Get Started</a>
            </div>
          </div>
        </div>
      </div>

      <div className='vertical-gap m-xxl-5'></div>

      <h1>Why learn English online with English School?</h1>
      
      <div className='d-flex justify-content-center m-xxl-5'>
        <div className='d-flex justify-content-around w-75 gap-5'>
          <div class="card w-100 border-0 m-3">
            <img src="https://i0.wp.com/cdnssl.ubergizmo.com/wp-content/uploads/2020/03/zoom-2.jpg" 
                 class="card-img-top object-fit-fill rounded-3 desc-img"/>
            <div class="card-body">
              <h5 class="card-title">Expertly-designed curriculums</h5>
              <p class="card-text">Build your confidence and learn to express yourself easily through conversation, light debate and role-playing.</p>
            </div>
          </div>
          <div class="card w-100 border-0 m-3">
            <img src="https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/tw-image-and-text-desktop-2.jpeg.webp" 
                 class="card-img-top object-fit-fill rounded-3 desc-img"/>
            <div class="card-body">
              <h5 class="card-title">Comfortable talking from day 1</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div class="card w-100 border-0 m-3">
            <img src="https://pacifictraining.edu.au/wp-content/uploads/2021/03/5-Tips-to-make-the-most-out-of-studying-on-Zoom-scaled.jpeg" 
                 class="card-img-top object-fit-fill rounded-3 desc-img"/>
            <div class="card-body">
              <h5 class="card-title">Small, immersive environment</h5>
              <p class="card-text">You’ll be surrounded by the language and encouraged to speak in classes that have a maximum of only 5 students.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='m-xxl-5 invisible'>H</div>

      <div className='d-flex justify-content-around gap-5 m-xxl-5'>
        <div className='w-50 m-xxl-5 text-start'>
          <h1>Learn English for everyday situations</h1>
          <p className='mt-3'>We don’t simply teach English from a textbook.
              <br/><br/>Through our rotation of international teachers, you’ll be exposed to a wide variety of accents, expressions and cultures. This means you’ll always learn the most up-to-date words and phrases used by English speakers worldwide.
              <br/><br/>And, in our Business English classes, we’ll prepare you for success in all contexts, teaching you to communicate, present and negotiate with confidence.</p>
        </div>
        <div className='w-50 m-xxl-5'>
          <img src='https://i.ytimg.com/vi/PPzIWFJU_3s/maxresdefault.jpg'
               className='rounded-3 w-100'></img>
        </div>
      </div>

      <div className='m-xxl-5 invisible'>H</div>

      <section className='wave-block mt-xxl-5'>
        <div class="wave trans"></div>
        <div className='wave-content '>
          <div className='d-flex justify-content-around p-xxl-5'>
            <div className='w-50 m-xxl-5 text-start'>
              <h1>Learn about our levels</h1>
              <p className='mt-3'>Each course is divided into specific learning levels. We teach up to C1 in English and B2 in Business English.
                 <br/><br/>Don’t know your English level?</p>
              <div className='d-flex justify-content-center'>
                <button className='m-3 btn btn-primary fs-5'>Tale our placement test</button>
              </div>
            </div>

            <div className='w-25 mt-xxl-5 ms-xxl-5'>
            <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>A1</h2>
                <div className='text-center w-100'>
                  <b>ABSOLUTE BEGINNER</b>
                  <div>Basic words and phrases</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>A2</h2>
                <div className='text-center w-100'>
                  <b>BEGINNER</b>
                  <div>Simple interactions</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>B1</h2>
                <div className='text-center w-100'>
                  <b>INTERMEDIATE</b>
                  <div>Everyday conversation</div>
                </div>
              </div>
            </div>

            <div className='w-25 mt-xxl-5 me-xxl-5'>
              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>B2</h2>
                <div className='text-center w-100'>
                  <b>UPPER-INTERMEDIATE</b>
                  <div>Complex topics</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>C1</h2>
                <div className='text-center w-100'>
                  <b>ADVANCED</b>
                  <div>Proficient language use</div>
                </div>
              </div>
            </div>
          </div>

          <div className='m-xxl-5 invisible'>H</div>
          <div className='m-xxl-5 invisible'>H</div>

          <h1 className='mt-5'>Meet some of our English language teachers</h1>
          <div className='mb-5'>Our teachers come from all over the world, bringing a range of cultures, accents and experiences for you to learn from.</div>

          
            {
              <div className='mt-5 d-flex justify-content-center'>
                {
                  tutors.map((tutor) => {
                    return (
                      <div className='bg-white rounded-3 tutor-card'>
                        <div>
                          <div className='tutor-card-img d-flex justify-content-center'>
                            <img src={ tutor.image }
                                className='w-100 rounded-circle'></img>
                          </div>
                          <h4 className='m-3'>{ tutor.name }</h4>
                          <div className='d-flex mb-2'>
                            <b>Where I am from:</b>
                            <div className='ms-2'>{ tutor.birthplace }</div>
                          </div>
                          <div className='d-flex'>
                            <b>My English level:</b>
                            <div className='ms-2'>{ tutor.englishLevel }</div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }

          <div className='mt-xxl-5 invisible'>H</div>
        </div>
      </section>
    </div>
  );
};

export default About;
