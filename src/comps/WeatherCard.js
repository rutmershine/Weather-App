import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchCurrentWeather, addFavoriteWeatherAction, addFavoriteWeather, fetchDailyForecast, fetchSearchResult } from '../actions'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
      minHeight: 250,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      margin: '1%',
      marginLeft: '5%'
  },
  bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
  },
  title: {
      fontSize: 14,
  },
  pos: {
      marginBottom: 12,
  },
});


function ImgMediaCard(props) {

  const classes = useStyles();
  return(
    <Card className={classes.root}>
          Date: {props.favWeather?.LocalObservationDateTime?.substring(0, 10)}
            <h1>Temperature: {props.favWeather?.Temperature?.Metric.Value}</h1>
            <h2>{props.favWeather?.WeatherText}</h2>
            <h2>{props.favWeather?.IsDayTime ? 'Day' : 'Night'}</h2>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather,
    favoritesWeather: state.favoritesWeather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavoriteWeatherAction: (data) => dispatch(addFavoriteWeatherAction(data)),
    addFavoriteWeather: (data, index) => dispatch(addFavoriteWeather(data, index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgMediaCard);
