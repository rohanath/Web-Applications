var assert = require('chai').assert;
var http = require('http');
var request = require('request');

describe('http login test', function(){
  it('should return the login if credentials are correct',
    function(done){
      var req = {username:"rohan@gmail.com",password:"rohana"}
      request.post('http://localhost:3002/users/doLogin',function(req,res) {
      assert.equal(201,res.status);
      done();
    })
  });
});

describe('http login test', function(){
  it('should invalidate as credentials are incorrect',
    function(done){
      var req = {username:"rohan@gmail.com",password:"rohasx"}
      request.post('http://localhost:3002/users/doLogin',function(req,res) {
      assert.equal(401,res.status);
      done();
    })
  });
});


describe('http signup test', function(){
  it('should sign up',
    function(done){
      var req = {firstname:"abc",lastname:"abc",username:"abc@gmail.com",password:"abc"}
      request.post('http://localhost:3002/users/doSignUp',function(req,res) {
      assert.equal(201,res.status);
      done();
    })
  });
});

describe('http signup test', function(){
  it('should not sign up',
    function(done){
      var req = {firstname:"abc",lastname:"abc",username:"rohan@gmail.com",password:"abc"}
      request.post('http://localhost:3002/users/doSignUp',function(req,res) {
      assert.equal(401,res.status);
      done();
    })
  });
});
