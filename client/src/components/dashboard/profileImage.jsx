import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setImgUrl, uploadImage } from '../../store/profile/profile.actions';
import { bindActionCreators } from 'redux';
import { BarLoader } from 'react-spinners';

class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUpload: ''
        }
    }
    onFileChange = (e) => {
        var files = e.target.files || e.dataTransfer.files
        this.setState({
            fileUpload: files
        })
        if (files.length > 0) {
            return this.createImage(files[0])
        }
    }
    createImage(file) {
        var reader = new FileReader()

        reader.onload = (e) => {
            this.props.setImgUrl(e.target.result);
        }
        reader.readAsDataURL(file)
    }

    uploadImage = () => {
        let data = new FormData()
        data.append('image', this.state.fileUpload[0])
        this.props.uploadImage(data)
    }

    render() {
        return (
            <div className='col-md-3 bg-white p-3 text-center h-50'>
                {
                    this.props.data.imgUrl ? 
                    <img src={this.props.data.imgUrl} alt="userimage" className="rounded-circle" style={styles.pointer} width={100} height={100} data-toggle="modal" data-target="#profilePictureModal" /> :
                    <img src='https://storage.googleapis.com/gigel-test.rezapramudhika.com/no-image-icon-15.png
                    ' alt="userimage" className="rounded-circle" style={styles.pointer} width={100} data-toggle="modal" data-target="#profilePictureModal" />
                }
                <h5 className='mt-2 mb-0 font-weight-bold text-capitalize'>{this.props.data.name}</h5>
                <p className='text-muted mb-0' style={styles.ftSize12}>
                    Member since {moment(this.props.data.createdAt).format('DD MMM YYYY')}
                </p>
                <div className="modal fade" id="profilePictureModal" tabIndex="-1" role="dialog" aria-labelledby="profilePictureModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div id='modal-content' className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Profile Picture</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-left">
                                <img src={this.props.profile.imgUrl} className="img img-fluid w-100" alt="" width={200} height={200} />
                                <input className='mt-2' type="file" accept="image/x-png,image/gif,image/jpeg" id="image" onChange={this.onFileChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                    this.props.profile.uploadImageLoading ?
                                        <button type="button" className="btn btn-primary" disabled>Save changes</button> :
                                        this.props.profile.imgUrl === this.props.profile.profile.imgUrl ?
                                            <button type="button" className="btn btn-primary" disabled>Save changes</button> :
                                            <button type="button" className="btn btn-primary" onClick={this.uploadImage}>Save changes</button>
                                }
                            </div>
                            {
                                this.props.profile.uploadImageLoading &&
                                <BarLoader
                                    width={document.querySelector('#modal-content').clientWidth}
                                    loaderStyle={styles.center}
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
    ftSize12: {
        fontSize: '12px'
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
    setImgUrl, uploadImage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)