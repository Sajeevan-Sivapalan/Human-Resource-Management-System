import React from 'react'
import {Box, Alert, AlertTitle} from '@mui/material'

const AlertBox = (props) => {

    const {type, message} = props

    return (
        <Box pb={4} pt={4} width="800px">
            <Alert severity={type} >
                <AlertTitle>{type}</AlertTitle>
                {message} — <strong>check it out!</strong>
            </Alert>
        </Box>

    )
}

export default AlertBox