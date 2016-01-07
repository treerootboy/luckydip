global.$ = require('jquery');
global.baseStyle = require('./Resource/base.css');

var ReactDOM = require('react-dom');
var React = require('react');
var App = require('./App.js');
ReactDOM.render(<App />, document.getElementById('react-container'));