import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../store/profile/profile.actions';
import { bindActionCreators } from 'redux';
import { BarLoader } from 'react-spinners';
import ProfileImage from './profileImage';
import ProfileEditForm from './profileEditForm';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
    getProfile
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)