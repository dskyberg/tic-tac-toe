import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    cell: {
        height: 100,
        width: "100%",
        backgroundColor: "white",
    },
}));

const BoardCell = (props) => {
    const classes = useStyles();
    const { idx, onClick, gridSize, value } = props;
    return (
        <Grid item xs={gridSize} >
            <div id={`${idx}`} className={classes.cell} onClick={onClick}>
                <Typography align="center" variant="h1">
                        {value === 'x' || value === 'o' ? value : ''}
                    </Typography>
            </div>
        </Grid>
    );
};
export default BoardCell;
