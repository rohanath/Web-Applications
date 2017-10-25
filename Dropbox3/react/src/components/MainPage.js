import React, {Component} from 'react';
import {Link,Route,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import LoginPage from './LoginPage';
import fileDialog from 'file-dialog';
import Axios from 'axios';
import Blob from 'blob';
import FormData from 'form-data';
import Files from 'react-files';
import About from "./About";


class MainPage extends Component {


  handleDownload = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:3002/uploads/${this.props.select.username}/Files/${item}`)
         .then((response) => {
              FileDownload(response.data,item);
         }).catch((err) => {
           window.alert("Could not download..!!Please try after some time..")
         })

    }

  handleUnstar = (item) => {

    Axios.get(`http://localhost:3002/users/deletestarfile`,{params:{username:this.props.select.username,filename:item}})
      .then((res) => {
        this.props.removestarFile(item);
        window.alert('Unstarred Successfully..!!');
      }).catch((err) => {
        window.alert('Could not Unstar!! Please try after some time..' +err)
      })


  }

  handleFilesChange = (files) => {

        this.props.fileUpload(files)
  }

  hanldeFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }


  handleUpload = () => {

    if(this.props.select.files.length > 0){
    var formData = new FormData();

    Object.keys(this.props.select.files).forEach((key) => {
    console.log('where you want')
    const file = this.props.select.files[key]
    formData.append(key, file, file.name || 'file')
    })
       Axios({
         method:'post',
         url:`http://localhost:3002/users/files`,
         data:formData,
         params:{username:this.props.select.username} })
        .then(response => {window.alert(`Files uploaded succesfully!`)})
        .catch(err => {window.alert(`Files could not be uploaded!`)})
        this.props.removeFiles();
        window.location.replace('http://localhost:3000/mainpage');
    }
    else{
        window.alert("Please select a file first!!")
    }
  }


  handleSignOut = (userdata) => {

        API.signout(userdata)
            .then((res) => {
                console.log("Signed out");
            }).catch(error => {
                  console.log("Error" +error);
            });


           localStorage.removeItem('jwtToken');
           this.props.storeRestore();
           window.location.replace('/');
    }

    handleAbout = (userdata) => {

        var status;

        API.fetchAbout(userdata)
            .then((res) => {
              status = res.status;
              return res.json()

            }).then((receiveddata) => {

                  if (status === 201) {
                      this.props.getUserData(receiveddata.results)
                  } else if (status === 404) {
                      //
                  }
            }).catch(error => {
                  this.props.storeRestore();
                  window.location.replace('/')
            });


        this.props.history.push('/about');
    }

    componentWillMount(){


          var status;
          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            else{
              API.fetchstarFiles({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  return res.json()
                }).then((json) => {

                      if (status === 201) {
                          this.props.storestarFiles(json.files)
                          console.log("Here");
                          window.location.replace('http://localhost:3000/mainpage');

                      } else if (status === 401) {
                          //
                      }
              });

            }

        }

    render(){

        var starredfiles = [];

        var userdata = {username:this.props.select.username,token:this.props.select.token}
      try{
        starredfiles = this.props.select.starredfiles.map(function(item,index){
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.handleDownload(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleUnstar(item)}>Unstar</button> </pre></td>
            </tr>
          );
        }.bind(this));
      }
      catch(err){console.log(err);}

        return(


          <div className="container-fluid">

              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                        <h3 id="Home">Home</h3>
                        <h4 id="starredtag">Starred</h4>
                        <hr/>
                            <table id="tablestar" className="table table-bordered">
                                <thead>
                                </thead>
                                <tbody>
                                    {starredfiles}
                                </tbody>
                            </table>
                        <div>
                          <ul id="recentfiles" ></ul>
                        </div>
                        <p id="errormessage"></p>
                  </div>
                  <div id="rightbarmain" className="col-md-3">

                        <div className="btn-group">
                          <button id="maindrop" type="button" className="btn btn-primary">Profile</button>
                          <button id="maindroparr" type="button" className="btn btn-default dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                          </button>
                          <div className="dropdown-menu">
                            <h6> {this.props.select.firstname} {this.props.select.lastname}</h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={() => this.handleAbout(userdata)}>About</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={() => this.handleSignOut(userdata)}>Sign Out</a>
                          </div>
                        </div>

                        <button id="selectfiles"
                                className="btn btn-primary"
                                type="button">
                          <Files id='filesadded'
                                ref='files'
                                className='files-dropzone-list'
                                onChange={this.handleFilesChange}
                                onError={this.handleFilesError}
                                multiple
                                maxFiles={10}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                          > Select Files
                          </Files>
                          </button>

                        <button id="uploadfiles"
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleUpload()}>
                        Upload Files</button>


                        <button id="sharedfolderlink"
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleShared()}>
                        New Shared Folder</button>


                  </div>
              </div>


          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },

    fileUpload: (files) => {
          dispatch({
        type: "ADDFILE",
        payload: {files:files}
      })
    },

    storestarFiles: (files) => {
          dispatch({
        type: "STAR",
        payload: {files:files}
      });
    },


    removeFiles: () => {
        dispatch({
        type: "REMOVEFILE"
      })
    },

    removestarFile: (file) => {
          dispatch({
        type: "REMOVESTAR",
        payload: {file:file}
      })
    },

    getUserData: (data) => {
          dispatch({
        type: "CHANGEDATA",
        payload :{data:data}
      });
    },
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));
