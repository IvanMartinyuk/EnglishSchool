import { useEffect, useState } from 'react';
import './Test.scss'
import { TestService } from '../../services/testService';
import { useNavigate } from 'react-router-dom';

let testService = new TestService();

const Test = () => {
    const [question, setQuestion] = useState();
    const [questionCount, setQuestionCount] = useState();
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [buttonText, setButtonText] = useState('Next');
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const navigate = useNavigate();
    let isTrueChose = false;
    const levelsCount = 4;
    const levels = ['A1', 'A2', 'B1', 'B2'];

    useEffect(() => {
        testService.getQuestion(selectedNumber).then(data => {
            setQuestion(data);
            testService.getQuestionCount().then(count => setQuestionCount(count));
        });
    }, [])

    const nextQuestion = () => {
        if(selectedNumber + 1 <= questionCount) {
            if(isTrueChose == 'true')
                setCorrectAnswersCount(correctAnswersCount + 1);            
            let num = selectedNumber + 1;
            if(num == questionCount)
                setButtonText('Check results');
            setSelectedNumber(num);
            testService.getQuestion(num).then(data => {
                setQuestion(data);
                testService.getQuestionCount().then(count => setQuestionCount(count));
            }); 
            let radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radioButton => {
              radioButton.checked = false;
            });
        }
        else {
            let markPerLevel = questionCount/levelsCount;
            let levelIndex = correctAnswersCount/markPerLevel;
            navigate('/test/' + parseInt(levelIndex))
        }
    }

    const answerHandler = (event) => {
        isTrueChose = event.target.value;
    }

    return(
        <div className='centerCenter'>
            <div>
                { question && 
                <p className='fs-3 w-750 d-flex'>
                    <div className='me-2'>{ selectedNumber + ')' }</div>
                    <div>
                        { question.content }
                    </div>
                </p> }
                <div className='d-flex gap-5 fs-5 justify-content-center'>
                    { question && question.answers.map(answer => {
                        return(
                            <div class="form-check">
                                <input class="form-check-input" 
                                       type="radio" 
                                       id="flexRadioDefault1" 
                                       name="inlineRadioOptions"
                                       value={ answer.isTrue }
                                       onChange={ answerHandler }/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    { answer.content }
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary m-4 fs-5' onClick={() => nextQuestion()}>{ buttonText }</button>
                </div>
            </div>
        </div>
    )
}

export default Test;