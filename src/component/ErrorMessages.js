import React from 'react'
import { ErrorMessage } from 'formik';

const ErrorMessages = ({name}) => {
  return (
    <div style={{color :'red', textTransform : 'capitalize'}}>
        <ErrorMessage name={name} />
    </div>
  )
}

export default ErrorMessages