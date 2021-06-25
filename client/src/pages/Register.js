import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'

function Register(props) {
    const [errors, setErrors] =  useState({});
    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    })
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const [addUser, {loading }] = useMutation(REGISTER_USER,{
        update(_,result){
            props.history.push('/');
        },
        onError(err){
            setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input error={errors.username ? true : false} label='Enter Username' name="username" value={values.username} onChange={onChange} />
                <Form.Input  error={errors.email ? true : false} label='Enter Email' type="email" name="email" value={values.email} onChange={onChange} />
                <Form.Input  error={errors.password ? true : false} label='Enter password' type="password" name="password" value={values.password} onChange={onChange} />
                <Form.Input error={errors.confirmPassword ? true : false} label='Enter confirm Password' type="password" name="confirmPassword" value={values.confirmPassword} onChange={onChange} />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username token createdAt
        }
    }
`

export default Register;
