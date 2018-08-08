import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, updateDateOfBirth } from '../../store/profile/profile.actions';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ProfileEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
    }

    updateProfile = () => {
        let gender = '';
        if (document.querySelector('#inputGender1').checked) {
            gender = '1'
        } else if (document.querySelector('#inputGender2').checked){
            gender = '2';
        }
        this.props.updateProfile({
            name: document.querySelector('input#inputName').value,
            gender,
            birthofdate: this.props.profile.dateOfBirth
        })
    }

    handleChange(date) {
        this.props.updateDateOfBirth(date);
    }

    render() {
        if (this.props.profile.profile !== '') {
            const { name, email, contact, gender } = this.props.profile.profile
            document.querySelector('input#inputName').value = name;
            document.querySelector('input#inputEmail').value = email;
            document.querySelector('input#inputContact').value = contact;
            if (gender === '1') {
                document.querySelector('#inputGender1').checked = true;
            } else if(gender === '2'){
                document.querySelector('#inputGender2').checked = true;
            }
        }
        return (
            <div className='col-md-8 bg-white p-3'>
                <div className='ml-3 mr-3 mt-3' style={styles.underlineBlue}>
                    <span className='h5 font-weight-bold'>Profile</span>
                </div>
                <form className='p-3'>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" placeholder="Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputGender" className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10 align-items-center">
                            <div className="form-check form-check-inline h-100">
                                <input className="form-check-input" type="radio" name="genderRadio" id="inputGender1" value="1" />
                                <label className="form-check-label" htmlFor="inputGender1">Male</label>
                            </div>
                            <div className="form-check form-check-inline h-100">
                                <input className="form-check-input" type="radio" name="genderRadio" id="inputGender2" value="2" />
                                <label className="form-check-label" htmlFor="inputGender2">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputBirthDate" className="col-sm-2 col-form-label">Date of Birth</label>
                        <div className="col-sm-10">
                        {
                            this.props.profile.dateOfBirth ?
                            <DatePicker
                                className='form-control pointer'
                                selected={this.props.profile.dateOfBirth}
                                onChange={this.handleChange} /> :
                                <DatePicker
                                className='form-control pointer'
                                onChange={this.handleChange} />
                        }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly disabled className="form-control" id="inputEmail" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputContact" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly disabled className="form-control" id="inputContact" />
                        </div>
                    </div>
                </form>
                <div className='text-center'>
                    <a href={'..'} data-toggle="modal" data-target="#changePasswordModal">Change password</a>
                </div>
                {
                    this.props.profile.updateProfileLoading ?
                        <button id='updateBtn' className="btn btn-block btn-primary mt-4" disabled>Save</button> :
                        <button id='updateBtn' className="btn btn-block btn-primary mt-4" onClick={this.updateProfile}>Save</button>
                }
            </div>
        );
    }
}

const styles = {
    underlineBlue: {
        width: '15%',
        borderBottom: '3px solid #3295be'
    },
    pointer: {
        cursor: 'pointer'
    }
}


const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateProfile,
    updateDateOfBirth
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm)