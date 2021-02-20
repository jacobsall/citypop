import React from 'react'
import { Alert } from '@material-ui/lab';

export default function ErrorBox(props) {
    return (
        <div>
            <Alert severity="error">{props.message}</Alert>
        </div>
    )
}
