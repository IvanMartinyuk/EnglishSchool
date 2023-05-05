import React, { useEffect, useState } from 'react';
import './Calendar.scss'
import { LessonService } from '../../services/lessonService';

const CalendarDemo = () => {
    useEffect(() => {
      let lessonService = new LessonService();
      lessonService.getLessons();
    }, [])
    return (
      <div></div>
    );
}
                 
export default CalendarDemo;