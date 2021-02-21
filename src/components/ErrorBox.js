import React from 'react'
import { Alert } from '@material-ui/lab';
import '../css/ErrorBox.css'
/* 
    -- ErrorBox --

    Displays an error message with a material-ui Alert.
*/
export default function ErrorBox({ message }) {
    return (
        <div className="error">
            <Alert severity="error">{message}</Alert>
        </div>
    )
}
