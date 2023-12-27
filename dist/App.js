"use strict";

function App() {
  var Router = ReactRouterDOM.BrowserRouter;
  var Switch = ReactRouterDOM.Switch;
  var Route = ReactRouterDOM.Route;
  return /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavigationPane, null), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/"
  }, /*#__PURE__*/React.createElement(LandingPage, null)), /*#__PURE__*/React.createElement(Route, {
    path: "/users"
  }, /*#__PURE__*/React.createElement(UserService, null)), /*#__PURE__*/React.createElement(Route, {
    path: "/questions"
  }, /*#__PURE__*/React.createElement(QuestionService, null)))));
}
window.App = App;
var rootElement = document.getElementById('contents');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);