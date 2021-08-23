import { connect } from 'react-redux';
import { fetchCurrentWeather, fetchDailyForecast, fetchSearchResult } from '../actions'
import { useEffect, useState } from 'react'
import ImgMediaCard from './WeatherCard'
import SimpleCard from './SimpleCard'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';






function Home({ currentWeather, fetchCurrentWeather, dailyForecasts, fetchDailyForecast, autocompleteResults, fetchSearchResult }) {

 
    let exists = false
    let [location, setLocation] = useState('215854')
    let [selectedCityName, setSelectedCityName] = useState('Tel Aviv')

    let locationKey
    let text
    if (localStorage['city']) {
        debugger
        let city = JSON.parse(localStorage['city'])
        locationKey = city.key
        text = city.name
    }
    else {
        locationKey = '215854'
        text = 'Tel Aviv'
    }

    useEffect(() => {

        fetchCurrentWeather(location);
        fetchDailyForecast(location);

    }, [])


    const fetchCityData = (selectedCity) => {

        console.log('selectedCity', selectedCity)
        debugger
        exists = false
        autocompleteResults.map(city => {
            if (city.LocalizedName == selectedCity) {
                setLocation(city.Key)
                exists = true
                setSelectedCityName(selectedCity);
                console.log(selectedCityName)
                console.log('location:', location)
            }
        })
        if (exists == true) {
            console.log(location)
            fetchCurrentWeather(location);
            fetchDailyForecast(location);
        }
    }

    const addToFavorites = () => {
        const favorites = localStorage['favorites'] ? JSON.parse(localStorage['favorites']) : [];
        favorites.push(
            {
                location,
                selectedCityName
            });
        localStorage['favorites'] = JSON.stringify(favorites);
    }

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(2),
        },
    }));

    const classes = useStyles();


    return (
        <div className="home">

            <input className="search" placeholder="Search..." type="text" list="browsers" name="inputCities" style={{ width: '20%', height:'10pm' }}
                onChange={(e) => { fetchSearchResult(e.target.value) }}
                onBlur={(e) => { fetchCityData(e.target.value)}}
                 />

            <datalist id="browsers">
                {autocompleteResults ? autocompleteResults.map(city =>
                (
                    <div>
                        <option key={city.locationKey}>{city.LocalizedName}</option>
                    </div>


                )) : <div>no data!</div>}
            </datalist>

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={addToFavorites}
                startIcon={<FavoriteIcon />}
            >
                ADD TO FAVORITES
            </Button>



            <ImgMediaCard favWeather={currentWeather} selectedCityName={selectedCityName} locationKey={location} />

            {console.log('dailyForecasts:', dailyForecasts)}


            {dailyForecasts ?
                <div className="five_container">
                    {dailyForecasts?.DailyForecasts?.map(forecast =>
                        <SimpleCard key={selectedCityName} forecast={forecast} selectedCityName={selectedCityName} />
                    )}
                </div> :
                <h1>no data</h1>
            }



        </div >

    );
}

const mapStateToProps = state => {
    return {
        currentWeather: state.currentWeather,
        dailyForecasts: state.dailyForecasts,
        autocompleteResults: state.autocompleteResults
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCurrentWeather: (location) => dispatch(fetchCurrentWeather(location)),
        fetchDailyForecast: (jerlocation) => dispatch(fetchDailyForecast(jerlocation)),
        fetchSearchResult: (text) => dispatch(fetchSearchResult(text))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
