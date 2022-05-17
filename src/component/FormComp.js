import React from 'react'
import { Field, Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import ErrorMessages from './ErrorMessages';
import '../css/SCSS/formComp.css'

let validationSchema = yup.object().shape({
  name: yup.string().required('name should be a string'),
  number: yup.number().min(1000000000,'10 digit number required !').required('Number is required'),
  email: yup.string().email().required('Email is required'),
  gender: yup.string().required('Gender is required'),
  skills: yup.array().min(1,'Add at least one skills').max(2,'nt more then two').required('one skill required'),
  date: yup.date().required('date is required'),
  social : yup.object().required('at lest one social profile is required'),
  additionalInfoFlag : yup.boolean(),
  additionalInfo : yup.string().when('additionalInfoFlag',{
      is : true,
      then : yup.string().required('additional info is required')
    })
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
        skills : [],
        additionalInfoFlag : false,
        additionalInfo : ''
    }
    return (
        <div className="formComp">
        <h1>Learning SCSS, Formic And Yup</h1>
            <div className="formCompDiv">
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
                        <div className='leftForm'>
                            <div>
                                <label htmlFor='name' >Name :&nbsp;</label>
                                <Field name='name' type='text'/>
                                <ErrorMessages name='name' />
                            </div>
                            <div>
                                <label htmlFor='email' >Email :&nbsp;</label>
                                <Field name='email' type='email' />
                                <ErrorMessages name='email' />
                            </div>
                            <div>
                                <label htmlFor='number' >Number :&nbsp;</label>
                                <Field name='number' type='number' />
                                <ErrorMessages name='number' />
                            </div>
                            <div>
                                <label htmlFor='password' >Password :&nbsp;</label>
                                <Field name='password' type='password'/>
                                <ErrorMessages name='password' />
                            </div>
                            <div>
                                <label htmlFor='gender' >Gender :&nbsp;</label>
                                <div>
                                    <div>
                                        <label>Male &nbsp;</label>
                                        <Field name='gender' type='radio' value='male'/>
                                    </div>
                                    <div>
                                        <label>Female &nbsp;</label>
                                        <Field name='gender' type='radio'value='female'/>
                                    </div>
                                </div>
                                
                                <ErrorMessages name='gender' />
                            </div>
                        </div>
                        <div className='rightForm'>
                            <div>
                                <label htmlFor='date'>Date :&nbsp;</label>
                                <Field name='date' type='date'/>
                                <ErrorMessages name='date' />
                            </div>
                            <div>
                                <label htmlFor='about'>About :&nbsp;</label>
                                <Field name='about' as='textarea'/>
                                <ErrorMessages name='about' />
                            </div>
                            <div>
                                <label htmlFor='income'>Income :&nbsp;</label>
                                <Field name='income' as='select'>
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                </Field>
                                <ErrorMessages name='income' />
                            </div>
                            <div>
                                <label htmlFor='social'>Social :&nbsp;</label>
                                <label htmlFor='social.facebook'>Facebook :&nbsp;</label>
                                <Field name='social.facebook' type='text'/>
                                <ErrorMessages name='social' />
                                <label htmlFor='social.twitter'>Twitter :&nbsp;</label>
                                <Field name='social.twitter' type='text'/>
                            </div>
                            <div>
                                <label htmlFor='skills'>Skills :&nbsp;</label>
                                <Field name='skills[0]' type='text'/>
                                <Field name='skills[1]' type='text'/>
                                <ErrorMessages name='skills' />
                            </div>
                            <div>
                                <label>Additional Info :&nbsp;</label>
                                <Field name='additionalInfoFlag' type='checkbox'/>
                                {
                                    values.additionalInfoFlag ? <Field name='additionalInfo' type='textarea'/> : null
                                }
                                <ErrorMessages name='additionalInfo' />
                            </div>
                            <div>
                                <FieldArray
                                name="friends"
                                render={arrayHelpers => (
                                <div id='fieldArrayDiv'>
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
                            </div>
                        </div>  
                        <button type='submit'>Submit</button>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default FormComp