import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    root: {
        minWidth: 250,
        minHeight: 200,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',

        margin: '1%'
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

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <Card className={classes.root}>
            <CardContent>

                <h2>Date: {props.forecast.Date?.substring(0, 10)}</h2>
                <h2>{days[(new Date(props.forecast.Date.substring(0, 10))).getDay()]}</h2>

                <h2>Min: {props.forecast.Temperature.Minimum.Value}</h2>
                <h2>Max: {props.forecast.Temperature.Maximum.Value}</h2>

            </CardContent>

        </Card>

    );
}
