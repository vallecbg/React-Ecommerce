import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Grid from '@material-ui/core/Grid'

const Spinner = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
            </Grid>        
        </Grid>
    )
}

export default Spinner