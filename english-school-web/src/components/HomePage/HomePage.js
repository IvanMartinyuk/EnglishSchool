import React, { useEffect } from 'react';
import './HomePage.scss';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HomePage = () => {  
  const { t, i18n } = useTranslation();
  const searchParams = useParams();
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0)
    navigate('/');
  }

  useEffect(()=> {
    if(searchParams.isRefresh == 'true')
      refreshPage();
  }, [])
  

  return (
    <div className='homepage text-center'>
      <div>
      <h1 className='introduction'>English School</h1>
      <section className="intro">
        <p className='w-600'>
          {t('Home intro')}
        </p>
      </section>
      </div>
    </div>
  );
};

export default HomePage;
