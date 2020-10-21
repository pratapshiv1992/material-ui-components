import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        display: "block",
        margin: "20px auto",
        background: "#19a6f9",
        textTransform: "inherit"
    },
    btnWrapper: {
        height: "95px"
    },
    circularProgress: {
        display: "block",
        margin: "2px auto"
    },
    error: {
        textAlign: "center",
        color: 'red'
    }
});


const LoadMore = (props) => {
    const [showLoader, setShowLoader] = useState(false);
    const {onLoadMore, error} = props;
    const classes = useStyles();

    const onLoadMoreClick = (e) => {
        if (typeof onLoadMore === 'function') {
            onLoadMore(e);
        }
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
        }, 2000);
    }


    return <div className={classes.btnWrapper}>
        {
            error && <p className={classes.error}>We had problems fetching your data. Please try again.</p>
        }
        {
            showLoader ?
                <CircularProgress
                    className={classes.circularProgress}
                />
                :
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={onLoadMoreClick}
                >
                    {error ? 'Retry' : 'Load more'}
                </Button>
        }
    </div>
}

export default LoadMore;
