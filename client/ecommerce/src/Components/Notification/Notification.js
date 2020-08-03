import React, { useEffect, useContext} from 'react'
import { StoreContext } from '../../Store/Store'
import { useSnackbar } from 'notistack'

const Notification = () => {
    const { state } = useContext(StoreContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    useEffect(() => {
        if(!state.notification.variant){
            return
        }
        const { variant, message } = state.notification
        enqueueSnackbar(message, {
            variant,
            autoHideDuration: 3000,
        })
    }, [state.notification, state.notification.message])

    return null
}

export default Notification