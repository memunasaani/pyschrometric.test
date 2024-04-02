import React, { useState } from 'react';
import '../App.css';

import quizData from '../api/quizData';

function Quiz() {

    const [displayQuestion, setDisplayQuestion] = useState(0);
    const [displayAnswer, setDisplayAnswer] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const [amountCorrect, setAmountCorrect] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState(0);
    const [clickable, setClickable] = useState(true);


    const reset = () => {
        setDisplayQuestion(0);
        setDisplayAnswer(false);
        setAnswerCorrect(false);
        setAmountCorrect(0)
        setShowResults(false);
        setResult(0);
        setClickable(true);
    }

    const handleNextBtn = () => {
        if (displayQuestion < quizData.questions.length - 1) {
            setDisplayQuestion(displayQuestion + 1)
            setDisplayAnswer(false);
            setAnswerCorrect(false);
            setClickable(true);
        } else {
            setShowResults(true);
            setResult((amountCorrect / quizData.questions.length) * 100)
        }
    }
    const handleBackBtn = () => {
        if (displayQuestion >= 1) {
            setDisplayQuestion(displayQuestion - 1)
            setAnswerCorrect(false);
            setDisplayAnswer(false);
        }
    }

    const handleAnswer = (index) => {
        if (quizData.questions[displayQuestion].correctAnswerIndex === index) {
            console.log('%cCorrect', `background-color: green`);
            setDisplayAnswer(!displayAnswer);
            setAnswerCorrect(true);
            setAmountCorrect(amountCorrect + 1);
            setClickable(false);
        } else {
            setDisplayAnswer(!displayAnswer);
            setClickable(false);
            console.log('%cWrong', `background-color: red`)
        }
    }

    return (
        <div className='quiz-container'>
            {
                !showResults ?
                    <>
                        <h2>Question (<span style={{ color: '#4cceac' }}>{displayQuestion + 1}</span> of {quizData.questions.length})</h2>

                        <div className='quiz-options'> 
                            <h2 className='question' dangerouslySetInnerHTML={{ __html: quizData.questions[displayQuestion].question }}></h2>
                            {
                                quizData.questions[displayQuestion].answers.map((answer, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className='quiz-option-container'
                                            disabled={!clickable}
                                            onClick={() => handleAnswer(index)}
                                        >
                                            <div className="option-content">
                                                
                                                <h3
                                                    style={displayAnswer && quizData.questions[displayQuestion].correctAnswerIndex === index
                                                        ? { color: '#4cceac' }
                                                        : displayAnswer && quizData.questions[displayQuestion].correctAnswerIndex !== index
                                                            ? { color: '#db4f4a' }
                                                            : null
                                                    }
                                                >
                                                    {answer}
                                                </h3>
                                            </div>
                                        </button>
                                    )
                                })
                            }
                        </div>

                        {displayAnswer && answerCorrect
                            ? <h1 style={{ color: '#4cceac' }}>Correct!</h1>
                            : displayAnswer && !answerCorrect &&
                            <h1 style={{ color: '#db4f4a' }}>Wrong</h1>

                        }

                        <div className='quiz-nav'>
                            <button onClick={handleBackBtn}><i className="fa-solid fa-arrow-left"></i>  Prev</button>
                            <button onClick={handleNextBtn}>Next  <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </>
                    
                    : 
                    <div className='results-container'>
                        <h1>Results</h1>
                        <div 
                            className='result-container' 
                            style={
                                result > 50 
                                ? {border: '3px solid #4cceac', boxShadow: '0 0 1rem #4cceac'}
                                : {border: '3px solid #db4f4a', boxShadow: '0 0 1rem #db4f4a'}
                            }
                        >
                            <h1 style={result > 50 ? {color: '#4cceac'}: {color: '#db4f4a'}}>
                                {result}%
                            </h1>
                        </div>
                        <button onClick={reset}>
                            Try Again
                        </button>
                    </div>

            }
        </div>
    )
}

export default Quiz;
