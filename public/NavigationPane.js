"use strict";

function NavigationPane() {
  var history = ReactRouterDOM.useHistory();
  function navigate(path) {
    history.push(path);
  }
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-dark bg-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "navbar-brand",
    href: "#",
    onClick: function onClick() {
      return navigate('/');
    }
  }, "AlphaMeta"), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#navbarNav",
    "aria-controls": "navbarNav",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse",
    id: "navbarNav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link active",
    "aria-current": "page",
    href: "#",
    onClick: function onClick() {
      return navigate('/');
    }
  }, "Home")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#",
    onClick: function onClick() {
      return navigate('/users');
    }
  }, "Users")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#",
    onClick: function onClick() {
      return navigate('/questions');
    }
  }, "Questions"))))));
}
window.NavigationPane = NavigationPane;