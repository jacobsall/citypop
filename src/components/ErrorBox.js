import React from 'react'
import { Alert } from '@material-ui/lab';
/* 
    -- ErrorBox --

    Displays an error message with a material-ui Alert.
*/
export default function ErrorBox({ message }) {
    return (
        <div>
            <Alert severity="error">{message}</Alert>
        </div>
    )
}
