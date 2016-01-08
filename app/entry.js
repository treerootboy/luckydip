global.$ = require('jquery');
global.baseStyle = require('./Resource/base.css');

import { Router, Route, Link } from 'react-router'
import React from 'react'
import { render } from 'react-dom'

var App = require('./App.js');
render(<App />, document.getElementById('react-container'));