import axios from 'axios';


export const fetchCurrentWeather = (locationKey, fav = -1) => {
    return (dispatch) => {
        axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=nNKGA3LVoDx6DOgu1Gd6MXZI67eA5oUe`)//second key
            .then((response) => {
                dispatch(currentWeatherAction(response.data[0]))
                if (fav != -1) {
                    dispatch(addFavoriteWeatherAction(response.data[0]));
                }
            })
            .catch(err => {
                console.log("have in get_from_axios problem :(!!!")
            })
    };
}

export const fetchDailyForecast = (locationKey) => {
    return (dispatch) => {
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=nNKGA3LVoDx6DOgu1Gd6MXZI67eA5oUe&metric=true`)
            .then((response) => {
                dispatch(fiveDailyForecastsAction(response.data))
            })
            .catch(err => {
                console.log("have in fetchDailyForecast problem :(!!!", err)
            })
    };
}

export const fetchSearchResult = (text) => {
    return (dispatch) => {
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=nNKGA3LVoDx6DOgu1Gd6MXZI67eA5oUe&q=${text}`)//good from server!
            .then((response) => {
                dispatch(autocompleteSearchAction(response.data))
            })
            .catch(err => {
                console.log("have in fetchSearchResult problem :(!!!")
            })
    };
}

export const addFavoriteWeather = (locationKey) => {
    return (dispatch) => {
        axios.get('/currentWeatherRespose.json')
            .then((response) => {
                dispatch(addFavoriteWeatherAction(response.data[0]))
            })
            .catch(err => {
                //console.log("have in get_from_axios problem :(!!!")
            })
    };
}


export const currentWeatherAction = (data) => {
    return {
        type: 'CURRENT_WEATHER',
        payload: data
    }
}

export const fiveDailyForecastsAction = (data) => {
    return {
        type: 'FIVE_DAILY_FORECASTS',
        payload: data
    }
}

export const autocompleteSearchAction = (data) => {
    return {
        type: 'AUTOCOMPLETE_SEARCH',
        payload: data
    }
}

export const addFavoriteWeatherAction = (data) => {
    debugger
    return {
        type: 'ADD_FAVORITE_WEATHER',
        payload: data,
        
    }
}

export const deleteFavorites = () => {
    debugger
    return {
        type: 'DELETE_FAVORITES',        
    }
}

