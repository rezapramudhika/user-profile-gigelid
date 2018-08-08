import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, checkEmail, checkContact } from '../store/user/user.actions';
import { bindActionCreators } from 'redux';
import isEmail from '../helper/isEmailFormat';
import { BarLoader } from 'react-spinners';
import isPassword from '../helper/isPassword';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            emailStatus: false,
            emailMsg: '',
            passwordValue: '',
            passwordStatus: false,
            passwordMsg: '',
            contactValue: '',
            contactStatus: false,
            contactMsg: '',
            nameValue: '',
            nameStatus: false,
            nameMsg: '',
        }
    }

    emailValidator = (e) => {
        if (isEmail(e.target.value)) {
            this.setState({
                emailMsg: '',
                emailStatus: true,
                emailValue: e.target.value
            })
            this.props.checkEmail({
                email: e.target.value
            })
        } else {
            this.setState({
                emailMsg: 'Input a valid email address',
                emailStatus: false
            })
        }
    }

    passwordValidator = (e) => {
        if (isPassword(e.target.value)) {
            this.setState({
                passwordMsg: '',
                passwordStatus: true,
                passwordValue: e.target.value
            })
        } else {
            this.setState({
                passwordMsg: 'Password must contain at least 8 characters and have a combination of numbers and letters',
                passwordStatus: false
            })
        }
    }

    contactValidator = (e) => {
        if (e.target.value.trim().length >= 8 && !isNaN(e.target.value)) {
            const inputNumber = e.target.value.replace(/[^\w\s]/gi, '')
            this.setState({
                contactMsg: '',
                contactStatus: true,
                contactValue: inputNumber
            })
            this.props.checkContact({
                contact: e.target.value
            })
        } else {
            this.setState({
                contactMsg: 'Input a valid phone number',
                contactStatus: false
            })
        }
    }

    nameValidator = (e) => {
        if (e.target.value.trim().length >= 2) {
            this.setState({
                nameMsg: '',
                nameStatus: true,
                nameValue: e.target.value
            })
        } else {
            this.setState({
                nameMsg: 'Name cannot be empty',
                nameStatus: false
            })
        }
    }

    register = () => {
        this.props.register({
            email: this.state.emailValue,
            password: this.state.passwordValue,
            name: this.state.nameValue,
            contact: this.state.contactValue
        })
    }

    render() {
        return (
            <div style={styles.container100vh}>
                <div className="h-100 row align-items-center">
                    <div id='register-container' className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-sm-8 offset-sm-2 bg-white p-0">
                        {
                            this.props.user.registerLoading &&
                            <BarLoader
                                width={document.querySelector('#register-container').clientWidth}
                                color={'#007bff'}
                                loading={this.props.loading}
                            />
                        }
                        <div className='p-5'>
                            <div className='mb-3 text-center'>
                                <img style={styles.center} src="https://gigel.id/images/gigel-logo.png" alt="Gigel logo" width={200} />
                                <h5 className='mt-2 font-weight-bold'>Registration</h5>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="registrationEmail">Email address</label>
                                    <input type="email" className="form-control" id="registrationEmail" placeholder="Enter email" onChange={this.emailValidator} />
                                    <small id="emailValidator" className="form-text text-danger">{this.state.emailMsg}</small>
                                    {
                                        this.props.user.checkEmailErrorCode === 403 &&
                                        <small id="emailValidator" className="form-text text-danger">This email is already taken</small>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationPassword">Password</label>
                                    <input type="password" className="form-control" id="registrationPassword" placeholder="Password" onChange={this.passwordValidator} />
                                    <small id="passwordValidator" className="form-text text-danger">{this.state.passwordMsg}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationName">Name</label>
                                    <input type="text" className="form-control" id="registrationName" placeholder="Name" onChange={this.nameValidator} />
                                    <small id="passwordValidator" className="form-text text-danger">{this.state.nameMsg}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationContact">Phone Number</label>
                                    <input type="text" className="form-control" id="registrationContact" placeholder="Phone Number" onChange={this.contactValidator} />
                                    <small id="passwordValidator" className="form-text text-danger">{this.state.contactMsg}</small>
                                    {
                                        this.props.user.checkContactErrorCode === 403 &&
                                        <small id="contactValidator" className="form-text text-danger">This phone number is already taken</small>
                                    }
                                </div>
                            </form>
                            {
                                this.state.emailStatus && this.state.passwordStatus && this.state.contactStatus && this.state.nameStatus ?
                                    this.props.user.registerLoading ?
                                        <button id='registerBtn' className="btn btn-block btn-primary mt-4 mb-2" disabled>Register</button> :
                                        this.props.user.checkEmailErrorCode !== 403 && this.props.user.checkContactErrorCode !== 403 ?
                                            <button id='registerBtn' className="btn btn-block btn-primary mt-4" onClick={this.register}>Register</button> :
                                            <button id='registerBtn' className="btn btn-block btn-primary mt-4" disabled>Register</button> :
                                    <button id='registerBtn' className="btn btn-block btn-primary mt-4" disabled>Register</button>
                            }
                            <div className='text-center mt-3'>
                                <p className='m-0'>Already registered?
                                <Link id='linkToLogin' to={'/login'}> Login Here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container100vh: {
        height: '100vh'
    },
    center: {
        display: 'block',
        margin: '0 auto'
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    checkEmail,
    checkContact
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Registration)