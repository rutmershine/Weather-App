import { fetchCurrentWeather, deleteFavorites, fetchSearchResult } from '../actions'
import { connect } from 'react-redux';
import SimpleCard from './SimpleCard';
import ImgMediaCard from './WeatherCard';
import { useHistory } from "react-router-dom";
import React, {  useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


function Favorites(props) {

    let location;
    const favoritesFromLocal = localStorage['favorites'] ? JSON.parse(localStorage['favorites']) : [];

    useEffect(() => {

        favoritesFromLocal.map((fav) => {
            location = fav.location;
            console.log('location', location)
            props.fetchCurrentWeather(location, 1);
        })
    }, [])

    useEffect(() => {
        props.deleteFavorites()
    }, [])

    const onFavClick = (f, key, name) => {
        let city = { key, name }
        localStorage['city'] = JSON.stringify(city)
        handleClick();
    }
    let history = useHistory();
    const handleClick = () => {
        history.push("/");
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }));

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    return (


        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>

                    {props.favoritesWeather.map((fav, val) => (

                        <div onClick={() => onFavClick(fav, favoritesFromLocal[val]?.location, favoritesFromLocal[val]?.selectedCityName)} >
                            <ImgMediaCard favWeather={fav} selectedCityName={favoritesFromLocal[val]?.selectedCityName}
                                locationKey={favoritesFromLocal[val]?.location} /></div>
                    ))}

                </Grid>
            </Grid>

        </Grid>

    );
}

const mapStateToProps = state => {
    return {
        currentWeather: state.currentWeather,
        favoritesWeather: state.favoritesWeather,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCurrentWeather: (location, fav) => dispatch(fetchCurrentWeather(location, fav)),
        deleteFavorites: () => deleteFavorites()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
