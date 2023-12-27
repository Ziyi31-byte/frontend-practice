"use strict";

// import React from 'react';
// import { Link } from 'react-router-dom';

function NavigationPane() {
  var Link = ReactRouterDOM.Link;
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, "Home")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    to: "/users"
  }, "User Service")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    to: "/questions"
  }, "Question Service"))));
}
window.NavigationPane = NavigationPane;