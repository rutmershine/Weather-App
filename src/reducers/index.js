const initialState = {
    autocompleteResults: [],
    currentWeather: {},
    dailyForecasts: {},
    favoritesWeather: []
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CURRENT_WEATHER':

            return {
                ...state,
                currentWeather: action.payload

            }
        case 'FIVE_DAILY_FORECASTS':

            return {
                ...state,
                dailyForecasts: action.payload

            }
        case 'AUTOCOMPLETE_SEARCH':

            return {
                ...state,
                autocompleteResults: action.payload

            }
        case 'DELETE_FAVORITES':
            return {
                ...state,
                favoritesWeather: []

            }
        case 'ADD_FAVORITE_WEATHER':
            let arr = state.favoritesWeather
            arr.push(action.payload)
            return {
              ...state,
              favoritesWeather: [...arr]
      
            }
        

    }
    return state;
}
export default weatherReducer;

