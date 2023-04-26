import React, { useEffect } from 'react';
import './HomePage.scss';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";



const HomePage = () => {  
  const searchParams = useParams();
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0)
    navigate('/');
  }

  useEffect(()=> {
    console.log(searchParams.isRefresh == 'true')
    if(searchParams.isRefresh == 'true')
      refreshPage();
  }, [])
  

  return (
    <div className='homepage text-center'>
      <div>
      <h1 className='introduction'>English School</h1>
      <section className="intro">
        <p>
          English School is dedicated to providing quality education in a
          <br/>friendly, supportive environment. We offer a range of programs
          <br/>designed to help students develop their language skills and prepare
          <br/>for academic success.
        </p>
      </section>
      </div>
    </div>
  );
};

export default HomePage;
