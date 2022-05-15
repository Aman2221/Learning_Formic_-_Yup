import React from 'react'
import { ErrorMessage } from 'formik';

const ErrorMessages = ({name}) => {
  return (
    <div style={{color :'red'}}>
        <ErrorMessage name={name} />
    </div>
  )
}

export default ErrorMessages