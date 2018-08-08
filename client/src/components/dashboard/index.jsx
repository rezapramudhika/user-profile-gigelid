import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, changePassword } from '../../store/profile/profile.actions';
import { bindActionCreators } from 'redux';
import { BarLoader } from 'react-spinners';
import ProfileImage from './profileImage';
import ProfileEditForm from './profileEditForm';
import isPassword from '../../helper/isPassword';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputOldPassword: '',
            inputNewPassword: '',
            inputConfirmPassword: '',
            confirmErrMsg: '',
            passwordErrMsg: '',
            newPasswordStatus: false
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
        this.props.getProfile();
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

    passOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    passwordValidator = (e) => {
        if (isPassword(e.target.value)) {
            this.setState({
                passwordErrMsg: '',
                newPasswordStatus: true,
                inputNewPassword: e.target.value
            })
        } else {
            this.setState({
                passwordErrMsg: 'Password must contain at least 8 characters and have a combination of numbers and letters',
                newPasswordStatus: false
            })
        }
    }

    confirmNewPass = (e) => {
        if (this.state.inputNewPassword !== e.target.value) {
            this.setState({
                inputConfirmPassword: e.target.value,
                confirmErrMsg: 'Password not match',
                newPasswordStatus: false
            });
        } else {
            this.setState({
                inputConfirmPassword: e.target.value,
                confirmErrMsg: '',
                newPasswordStatus: true
            });
        }
    }

    changePassword = () => {
        this.props.changePassword({
            oldPassword: this.state.inputOldPassword,
            newPassword: this.state.inputNewPassword
        })
    }

    render() {
        return (
            <div>
                <nav id='navbar' className="navbar navbar-light" style={styles.backgroundBlue}>
                    <div className='container'>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <img className="navbar-brand mb-0 h1" src="https://gigel.id/images/gigel-logo.png" alt="Gigel logo" width={80} />
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link pointer" onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div id='container-profile' className='container-fluid p-0'>
                    {
                        this.props.profile.getProfileLoading &&
                        <BarLoader
                            width={document.querySelector('#container-profile').clientWidth}
                            loaderStyle={styles.center}
                            color={'#007bff'}
                            loading={this.props.loading}
                        />
                    }
                    {
                        this.props.profile.updateProfileLoading &&
                        <BarLoader
                            width={document.querySelector('#container-profile').clientWidth}
                            loaderStyle={styles.center}
                            color={'#007bff'}
                            loading={this.props.loading}
                        />
                    }
                    <div className='row justify-content-around m-5'>
                        <ProfileImage data={this.props.profile.profile} imgUrl={this.props.profile.profile.imgUrl} />
                        <ProfileEditForm data={this.props.profile.profile} />
                    </div>
                </div>
                <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div id='modal-content' className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Change Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.props.profile.changePasswordErrorCode === 401 &&
                                    <div className="alert alert-danger" role="alert">
                                        Old password is wrong
                                    </div>
                                }
                                <form>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputOldPassword" placeholder="Old Password" onChange={this.passOnChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputNewPassword" placeholder="New Password" onChange={this.passwordValidator} />
                                        <small id="passwordValidator" className="form-text text-danger">{this.state.passwordErrMsg}</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm New Password" onChange={this.confirmNewPass} />
                                        <small id="passwordValidator" className="form-text text-danger">{this.state.confirmErrMsg}</small>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                    this.props.profile.changePasswordLoading ?
                                        <button type="button" className="btn btn-primary" disabled>Save</button> :
                                        this.state.newPasswordStatus && this.state.inputConfirmPassword !== '' ?
                                            <button type="button" className="btn btn-primary" onClick={this.changePassword}>Save</button> :
                                            <button type="button" className="btn btn-primary" disabled>Save</button>
                                }
                            </div>
                            {
                                this.props.profile.changePasswordLoading &&
                                <BarLoader
                                    width={'100%'}
                                    color={'#007bff'}
                                    loading={this.props.loading}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    backgroundBlue: {
        backgroundColor: '#eeeeee'
    },
    ftSize12: {
        fontSize: '12px'
    },
    center: {
        display: 'block',
        margin: '0 auto'
    },
    underlineBlue: {
        width: '10%',
        borderBottom: '3px solid #3295be'
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getProfile,
    changePassword
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)