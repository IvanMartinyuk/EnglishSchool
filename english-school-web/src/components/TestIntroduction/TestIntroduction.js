import { useNavigate } from 'react-router-dom';
import './TestIntroduction.scss'
import { useTranslation } from 'react-i18next';

const TestIntroduction = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return(
        <div className="centerCenter">
            <div className="w-750 text-center">
                <p>
                    <h3 className="fs-4">{ t('Find out your current English level!') }</h3>
                </p>
                <p>
                    <div className="fs-4">{ t('This online level test will give you an ') }
                    <b className='ms-2 me-2'>{ t('approximate') }</b>
                    { t("indication of your English language level.") }</div>
                 </p>
                 <p>
                    <div className="fs-4">{ t('There are 10 questions and the test takes less than') } 
                    <b className='ms-2 me-2'>{ t('5 minutes') }</b>
                    { t(". Upon completion, we'll email your results.") }</div>
                </p>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary fs-4' onClick={ () => navigate('/test') }>{ t("Start test") }</button>
                </div>
            </div>
        </div>
    )
}

export default TestIntroduction;