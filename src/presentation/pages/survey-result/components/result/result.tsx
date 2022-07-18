import React from 'react';
import Styles from './result-styles.scss';
import { Calendar } from '@/presentation/components';
import { useNavigate } from 'react-router';
import { LoadSurveyResult } from '@/domain/usecases';
import Answer from '../answer/answer';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul className={Styles.answersList} data-testid="answers">
        {surveyResult.answers.map(answer => (
          <Answer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button className={Styles.button} data-testid="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </>
  );
};

export default Result;
