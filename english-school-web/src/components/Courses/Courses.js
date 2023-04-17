import { useState } from 'react';
import './Courses.scss'
import { useEffect } from 'react';
import { CourseService } from '../../services/courseService';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let courseService = new CourseService();
        courseService.getList().then(data => {
            setCourses(data);
        })
    }, [])

    return (
        <div className='centerCenter'>
            <div>
                <h1 className='pageTitle'>Prices</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <b className='text-start'>The more classes, the lower the price</b>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>The lesson lasts 50 minutes</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>Price - from $9/lesson</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>There is a payment in installments.</div>
                        </div>

                        <b className='text-wrap'>In addition to classes with a teacher, the price also includes</b>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>Speaking clubs for speaking practice</div>
                        </div>
                        <div className='mt-2 mb-2 d-flex gap-2 align-items-center'>
                            <div className='greenPoint'></div>
                            <div>Support manager who solves all issues.</div>
                        </div>
                    </div>

                    <div className='courseCardBox'>
                        <div className='courseCard'>
                            <div>Minimum</div>
                            <b>5 classes</b>
                            <br></br>
                            <div className='text-wrap'>You will refresh your English and immerse yourself in the online learning process.</div>
                            <div>60$</div>
                        </div>
                        <div className='courseCard'>hhghghgh</div>
                        <div className='courseCard'>hhghghgh</div>
                        <div className='courseCard'>hhghghgh</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses;