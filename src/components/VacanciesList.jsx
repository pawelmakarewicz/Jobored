import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVacancies } from '../slices/vacanciesSlice';

const useInitialVacancies = () => {
    const dispatch = useDispatch();
    const accessTokenLoadingStatus = useSelector(state => state.accessTokens.loadingStatus);

    console.log('accessTokenLoadingStatus', accessTokenLoadingStatus);

    useEffect(() => {
        if (accessTokenLoadingStatus === 'succeed') {
            console.log('initial get vacancies');
            dispatch(getVacancies());
        }
    }, [accessTokenLoadingStatus]);
}

function VacanciesList(props) {
    useInitialVacancies();

    // TODO: subscribe to vacansies and render
    // useSelector(state => state.vacancies);
    
    return <div>TODO: render vacancies</div>
}

export default VacanciesList;
