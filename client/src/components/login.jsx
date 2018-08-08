import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/user/user.actions';
import { bindActionCreators } from 'redux';
import isEmail from '../helper/isEmailFormat';
import { BarLoader } from 'react-spinners';
// import isPassword from '../helper/isPassword';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            emailStatus: false,
            emailMsg: '',
            passwordValue: '',
            passwordStatus: false,
            passwordMsg: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/')
        }
    }

    emailValidator = (e) => {
        if (isEmail(e.target.value)) {
            this.setState({
                emailMsg: '',
                emailStatus: true,
                emailValue: e.target.value
            })
        } else {
            this.setState({
                emailMsg: 'Input a valid email address',
                emailStatus: false
            })
        }
    }

    passwordValidator = (e) => {
        if (e.target.value.trim().length !== 0) {
            this.setState({
                passwordMsg: '',
                passwordStatus: true,
                passwordValue: e.target.value
            })
        } else {
            this.setState({
                passwordMsg: 'Password cannot be empty',
                passwordStatus: false
            })
        }
    }

    login = () => {
        this.props.login({
            email: this.state.emailValue,
            password: this.state.passwordValue
        })
    }

    render() {
        return (
            <div style={styles.container100vh}>
                <div className="h-100 row align-items-center">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-sm-8 offset-sm-2 bg-white p-0">
                        <div className='p-5'>
                            <div className='mb-3 text-center'>
                                <img style={styles.center} src="https://gigel.id/images/gigel-logo.png" alt="Gigel logo" width={200} />
                                <h5 className='mt-2 font-weight-bold'>Login</h5>
                            </div>
                            {
                                this.props.location.pathname.split('/')[2] === 'register-success' &&
                                <div className="alert alert-success" role="alert">
                                    Register success! Please login to your account.
                                </div>
                            }
                            {
                                this.props.user.loginErrorCode === 401 &&
                                <div className="alert alert-danger" role="alert">
                                    Either email or password is wrong
                            </div>
                            }
                            {
                                this.props.user.loginErrorCode === 404 &&
                                <div className="alert alert-danger" role="alert">
                                    Email not found
                            </div>
                            }
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={this.emailValidator} />
                                    <small id="emailValidator" className="form-text text-danger">{this.state.emailMsg}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.passwordValidator} />
                                    <small id="passwordValidator" className="form-text text-danger">{this.state.passwordMsg}</small>
                                </div>
                            </form>
                            {
                                this.state.emailStatus && this.state.passwordStatus ?
                                    this.props.user.loginLoading ?
                                        <button id='loginBtn' className="btn btn-block btn-primary mt-4 mb-2" disabled>Login</button> :
                                        <button id='loginBtn' className="btn btn-block btn-primary mt-4" onClick={this.login}>Login</button> :
                                    <button id='loginBtn' className="btn btn-block btn-primary mt-4" disabled>Login</button>
                            }
                            <div className='text-center mt-3'>
                                <p className='m-0'>Not registered yet?
                                <Link id='linkToRegistration' to={'/registration'}> Register Here</Link>
                                </p>
                            </div>
                        </div>
                        {
                            this.props.user.loginLoading &&
                            <BarLoader
                                width={'100%'}
                                color={'#3d4b63'}
                                loading={this.props.loading}
                            />
                        }
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
    login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)