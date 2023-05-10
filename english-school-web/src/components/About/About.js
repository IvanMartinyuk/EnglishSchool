import React, { useEffect, useState } from 'react';
import './About.scss';
import { UserService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const [tutors, setTutors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userService = new UserService();
    userService.tutorAboutList().then(data => {
      setTutors(data);
    })
  }, [])

  const goToTest = () => {
    navigate('/testIntroduction');
  }

  return (
    <div className='text-center'>
      <div className='courses-line'>
        <div className='w-100 h-100'>
          <img src='https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/english-section-hero-desktop-1.png.webp'
              className='w-100 h-100 object-fit'></img>
        </div>
        <div className='courses-line d-flex align-items-center course-line-body justify-content-start w-50 text-start'>
          <div className='bg-transparent m-5'>
            <h1 className='bg-transparent w-75 text-start'>{ t('About.Second language') }</h1>
            <div className='bg-transparent w-75 text-wrap text-start'>{ t('About.Second language desc') }</div>
            <div className='w-75 d-flex justify-content-center'>
              <a className='btn btn-primary m-2 fs-4' href='/courses'>{ t('Get started') }</a>
            </div>
          </div>
        </div>
      </div>

      <div className='vertical-gap m-xxl-5'></div>

      <h1>{ t('Why we?') }</h1>
      
      <div className='d-flex justify-content-center m-xxl-5'>
        <div className='d-flex justify-content-around w-75 gap-5'>
          <div class="card border-0 m-3">
            <div className='desc-img'>
              <img src="https://i0.wp.com/cdnssl.ubergizmo.com/wp-content/uploads/2020/03/zoom-2.jpg" 
                  class="card-img-top object-fit-fill rounded-3 h-100"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">{ t('About. 2 layer. Card 1. Title') }</h5>
              <p class="card-text">{ t('About. 2 layer. Card 1. Text') }</p>
            </div>
          </div>
          <div class="card border-0 m-3">
            <div className='desc-img'>
              <img src="https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/tw-image-and-text-desktop-2.jpeg.webp" 
                  class="card-img-top object-fit-fill rounded-3 h-100"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">{ t('About. 2 layer. Card 2. Title') }</h5>
              <p class="card-text">{ t('About. 2 layer. Card 2. Text') }</p>
            </div>
          </div>
          <div class="card border-0 m-3">
            <div className='desc-img'>
              <img src="https://pacifictraining.edu.au/wp-content/uploads/2021/03/5-Tips-to-make-the-most-out-of-studying-on-Zoom-scaled.jpeg" 
                  class="card-img-top object-fit-fill rounded-3 h-100"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">{ t('About. 2 layer. Card 3. Title') }</h5>
              <p class="card-text">{ t('About. 2 layer. Card 3. Text') }</p>
            </div>
          </div>
        </div>
      </div>

      <div className='m-xxl-5 invisible'>H</div>

      <div className='d-flex justify-content-around gap-5 m-xxl-5'>
        <div className='w-50 m-xxl-5 text-start'>
          <h1>{ t('About. 3 layer. Title') }</h1>
          <p className='mt-3'>{ t('About. 3 layer. Text 1') } 
              <br/><br/> { t('About. 3 layer. Text 2') }
              <br/><br/> { t('About. 3 layer. Text 3') }</p>
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
              <h1>{ t('About. 4 layer. Title') }</h1>
              <p className='mt-3'>{ t('About. 4 layer. Text 1') }
                 <br/><br/>{ t('About. 4 layer. Text 2') }</p>
              <div className='d-flex justify-content-center'>
                <button className='m-3 btn btn-primary fs-5' onClick={() => goToTest()}>{ t('Take our placement test') }</button>
              </div>
            </div>

            <div className='w-25 mt-xxl-5 ms-xxl-5'>
            <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>A1</h2>
                <div className='text-center w-100'>
                  <b>{ t('A1 Title') }</b>
                  <div>{ t('A1 Text') }</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>A2</h2>
                <div className='text-center w-100'>
                  <b>{ t('A2 Title') }</b>
                  <div>{ t('A2 Text') }</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>B1</h2>
                <div className='text-center w-100'>
                  <b>{ t('B1 Title') }</b>
                  <div>{ t('B1 Text') }</div>
                </div>
              </div>
            </div>

            <div className='w-25 mt-xxl-5 me-xxl-5'>
              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>B2</h2>
                <div className='text-center w-100'>
                  <b>{ t('B2 Title') }</b>
                  <div>{ t('B2 Text') }</div>
                </div>
              </div>

              <div className='m-3 bg-white rounded-5 d-flex p-1 pt-2'>
                <h2 className='ms-3 bg-primary text-white p-1 rounded-1'>C1</h2>
                <div className='text-center w-100'>
                  <b>{ t('C1 Title') }</b>
                  <div>{ t('C1 Text') }</div>
                </div>
              </div>
            </div>
          </div>

          <div className='m-xxl-5 invisible'>H</div>
          <div className='m-xxl-5 invisible'>H</div>

          <h1 className='mt-5'>{ t('About. 5 layer. Title') }</h1>
          <div className='mb-5'>{ t('About. 5 layer. Text') }</div>

          
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
