import { useState } from 'react';
import './Courses.scss'
import { useEffect } from 'react';
import { CourseService } from '../../services/courseService';
import { CheckoutService } from '../../services/checkoutService';
import { useTranslation } from 'react-i18next';

const Courses = () => {
    const { t, i18n } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [courseClasses, setCourseClasses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [isCourseSelected, setIsCourseSelected] = useState(true);
    const [loginErrorClass, setLoginErrorClass] = useState('collapse alert alert-danger mt-4');

    useEffect(() => {
        let courseService = new CourseService();
        courseService.getList().then(data => {
            setCourses(data);
            let classes = [];
            data.forEach(course => {
                classes.push('courseCard');
            });
            setCourseClasses(classes);
        })
    }, [])

    const selectCourse = (courseIndex) => {
        courseClasses[courseIndex] = 'courseCard selected';
        let prevSelectedIndex = courses.indexOf(selectedCourse);
        courseClasses[prevSelectedIndex] = 'courseCard';
        setSelectedCourse(courses[courseIndex]);
        setIsCourseSelected(false);
    }

    const buyHandler = () => {
        if(sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken").length > 0)
        {
            let service = new CheckoutService();
            let body = {
                successUrl: window.location.origin + '/successfulPayment/' + selectedCourse.id,                
                cancelUrl: window.location.origin + '/cancelPayment/',
                priceId: selectedCourse.priceId
            }
            service.createCheckoutSession(body).then(resp => {
                sessionStorage.setItem("IsPaymentSave", false)
                window.location.replace(resp.url);
            })
        }
        else {
            setLoginErrorClass('alert alert-danger mt-4');
        }
    }

    return (
        <div className='centerCenter'>
            <div className='coursesBox'>
                <div className={loginErrorClass}>{ t('You must sign in before paying') }</div>
                <h1 className='pageTitle'>{ t('Prices') }</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <b className='text-start'>{ t('The more classes, the lower the price') }</b>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>{ t('The lesson lasts 50 minutes') }</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>{ t('Price - from $9/lesson') }</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>{ t('There is a payment in installments.') }</div>
                        </div>

                        <b className='text-wrap'>{ t('In addition to classes with a teacher, the price also includes') }</b>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>{ t('Speaking clubs for speaking practice') }</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>{ t('Support manager who solves all issues.') }</div>
                        </div>

                        <div className='d-flex justify-content-center mt-4'>
                            <button className='btn btn-primary' disabled={isCourseSelected} onClick={buyHandler}>{ t('Buy now') }</button>
                        </div>
                    </div>

                    <div className='courseCardBox'>
                        {
                            courses.map((course) => {
                                let index = courses.indexOf(course);
                                return (
                                    <div className={courseClasses[index]} onClick={() => selectCourse(index)}>
                                        <div className='courseCardHead'>
                                            <div className='text-white'>{ course.name }</div>
                                            <b className='text-white'>{ course.classesCount + " classes" }</b>
                                        </div>
                                        
                                        <hr className='courseCardLine'></hr>

                                        <div className='courseCardBody'>
                                            <div className='text-wrap courseDesc'>{ course.description }</div>
                                            <div className='d-flex justify-content-center gap-2 mt-2 mb-2'>
                                                <b>{ t('Price') }</b>
                                                <div>{ course.price + '$'}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses;