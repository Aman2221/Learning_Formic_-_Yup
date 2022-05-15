import React from 'react'
import { Field, Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import ErrorMessages from './ErrorMessages';

let validationSchema = yup.object().shape({
  name: yup.string().required('name should be a string'),
  number: yup.number().min(1000000000,'10 digit number required !').required('Number is required'),
  email: yup.string().email().required('Email is required'),
  gender: yup.string().required('Gender is required'),
  skills: yup.array().min(1,'Add at least one skills').max(2,'nt more then two').required('one skill required'),
  date: yup.date().required('date is required'),
  social : yup.object().required('at lest one social profile is required'),
});

const FormComp = () => {
    let initialValues = { 
        name : '', 
        email: '', 
        password: '',
        number : '', 
        gender : '', 
        date : '', 
        income:'',
        about : '', 
        social : {facebook : '', twitter : '' },
        skills : []
    }
    return (
        <div className="formComp">
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => console.log(values)}
                validationSchema = {validationSchema}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor='name' >Name :&nbsp;</label>
                        <Field name='name' type='text'/>
                        <br/><br/>
                        <ErrorMessages name='name' />
                        <label htmlFor='email' >Email :&nbsp;</label>
                        <Field name='email' type='email' />
                        <br/><br/>
                        <ErrorMessages name='email' />
                        <label htmlFor='number' >Number :&nbsp;</label>
                        <Field name='number' type='number' />
                        <br/><br/>
                        <ErrorMessages name='number' />
                        <label htmlFor='password' >Password :&nbsp;</label>
                        <Field name='password' type='password'/>
                        <br/><br/>
                        <ErrorMessages name='password' />
                        <label htmlFor='gender' >Gender :&nbsp;</label>
                        <br/><br/>
                        <label>Male :&nbsp;</label>
                        <Field name='gender' type='radio' value='male'/>
                        <label>Female :&nbsp;</label>
                        <Field name='gender' type='radio'value='female'/>
                        <br/><br/>
                        <ErrorMessages name='gender' />
                        <label htmlFor='date'>Date :&nbsp;</label>
                        <Field name='date' type='date'/>
                        <br/><br/>
                        <ErrorMessages name='date' />
                        <label htmlFor='about'>About :&nbsp;</label>
                        <Field name='about' as='textarea'/>
                        <br/><br/>
                        <ErrorMessages name='about' />
                        <label htmlFor='income'>Income :&nbsp;</label>
                        <Field name='income' as='select'>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="4000">4000</option>
                        </Field>
                        <br/><br/>
                        <ErrorMessages name='income' />
                        <label htmlFor='social'>Social :&nbsp;</label>
                        <br/><br/>
                        
                        <label htmlFor='social.facebook'>Facebook :&nbsp;</label>
                        <Field name='social.facebook' type='text'/>
                        <br/><br/>
                        <ErrorMessages name='social' />
                        <label htmlFor='social.twitter'>Twitter :&nbsp;</label>
                        <Field name='social.twitter' type='text'/>
                        <br/><br/>
                        <label htmlFor='skills'>Skills :&nbsp;</label>
                        <br/><br/>
                        <ErrorMessages name='skills' />
                        <Field name='skills[0]' type='text'/>
                        <Field name='skills[1]' type='text'/>
                        <br/><br/>
                        
                        <FieldArray
                            name="friends"
                            render={arrayHelpers => (
                            <div>
                                {values.friends && values.friends.length > 0 ? (
                                values.friends.map((friend, index) => (
                                    <div key={index}>
                                    <Field name={`friends.${index}`} />
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                    >
                                        +
                                    </button>
                                    </div>
                                ))
                                ) : (
                                <button type="button" onClick={() => arrayHelpers.push('')}>
                                    {/* show this when user has removed all friends from the list */}
                                    Add a friend
                                </button>
                                )}
                                <div>
                                </div>
                            </div>
                            )}
                        />
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormComp