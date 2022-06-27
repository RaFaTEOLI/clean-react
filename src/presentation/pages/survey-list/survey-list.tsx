import React, { useContext, useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { SurveyListItem, SurveyContext, SurveyError } from './components';
import Styles from './survey-list-styles.scss';
import { ApiContext } from '@/presentation/contexts';
import { useNavigate } from 'react-router';
import { AccessDeniedError } from '@/domain/errors';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  });

  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.all();
        setState({ ...state, surveys, reload: false });
      } catch (error) {
        console.log(error);
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          console.log('called setCurrentAccount');
          navigate('/login');
        } else {
          setState({ ...state, error: error.message, reload: false });
        }
      }
    })();
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
