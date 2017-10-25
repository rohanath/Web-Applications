import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import Axios from 'axios';
import {connect} from "react-redux";
import Download from 'download-file';

class Files extends Component {


  handleDownload = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:3002/uploads/${this.props.select.username}/Files/${item}`)
         .then((response) => {
              FileDownload(response.data,item);
         }).catch((err) => {
           window.alert("Could not download..!!Please try after some time..")
         })

    }

    handleDelete = (item) => {
       Axios.get(`http://localhost:3002/users/deletefile`,{params:{username:this.props.select.username,filename:item}})
         .then((res) => {
           this.props.removeFile(item);
           window.alert('Deleted Successfully..!!');
         }).catch((err) => {
           window.alert('Could not delete!! Please try after some time..')
         })

      }


    handleStar = (item) => {

      Axios.get(`http://localhost:3002/users/starfile`,{params:{username:this.props.select.username,filename:item}})
        .then((res) => {
          //this.props.starFile(item);
          window.alert('Starred Successfully..!!')

        }).catch((err) => {
          window.alert(`Could not be starred!! Please try after some time..` +err)
        })
    }


    componentWillMount(){

          var files1,status;

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            else{

              API.fetchFiles({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  return res.json()
                }).then((json) => {

                      if (status === 201) {
                          this.props.storeFiles(json.files)
                          window.location.replace('http://localhost:3000/files');
                      } else if (status === 401) {
                          console.log("Rohan")
                      }
              });

            }

        }

    render(){
        var files = [];
        console.log('files render');
        var status,url;


        files = this.props.select.files.map(function(item,index){
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.handleDownload(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleDelete(item)}>Delete</button>  <button className="btn btn-primary"  id="star" type="button" onClick =
              {() => this.handleStar(item)}>Star</button></pre></td>
            </tr>
          );
        }.bind(this));



        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                  <h3 className="text-center"> Files </h3>
                  <table id="tableMenu" className="table table-bordered">
                      <thead>
                      </thead>
                      <tbody>
                          {files}
                      </tbody>
                  </table>
                  </div>
              </div>
          </div>
        );
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

    countAPI: () => {
          dispatch({
        type: "APICOUNT"
      });
    },

    storeFiles: (files) => {
          dispatch({
        type: "ADDFILE",
        payload: {files:files}
      });
    },

    removeFile: (file) => {
          dispatch({
        type: "REMOVE",
        payload: {file:file}
      });
    },

    starFile: (files) => {
          dispatch({
        type: "STAR",
        payload: {files:files}
      });
    },

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Files));
