"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// UserProfileUpdateForm.jsx
// import React from 'react';
var UserProfileUpdateForm = /*#__PURE__*/function (_React$Component) {
  _inherits(UserProfileUpdateForm, _React$Component);
  var _super = _createSuper(UserProfileUpdateForm);
  function UserProfileUpdateForm() {
    var _this;
    _classCallCheck(this, UserProfileUpdateForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      email: '',
      password: '',
      name: '',
      age: '',
      location: ''
    });
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;
      _this.setState(_defineProperty({}, name, value));
    });
    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      e.preventDefault();
      var _this$state = _this.state,
        email = _this$state.email,
        password = _this$state.password,
        name = _this$state.name,
        age = _this$state.age,
        location = _this$state.location;
      var auth = {
        email: email,
        password: password
      };
      var profileData = {
        name: name === "" ? null : name,
        age: age === "" ? null : parseInt(age, 10),
        location: location === "" ? null : location
      };
      _this.props.onUpdateProfile(auth, profileData);
      _this.setState({
        email: '',
        password: '',
        name: '',
        age: '',
        location: ''
      });
    });
    return _this;
  }
  _createClass(UserProfileUpdateForm, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        email = _this$state2.email,
        password = _this$state2.password,
        name = _this$state2.name,
        age = _this$state2.age,
        location = _this$state2.location;
      return /*#__PURE__*/React.createElement("div", {
        className: "container my-4"
      }, /*#__PURE__*/React.createElement("h2", null, "Update Profile"), /*#__PURE__*/React.createElement("p", null, "To update your profile, please enter your email and password for authorization purposes."), /*#__PURE__*/React.createElement("p", null, "Please also enter the profile fields that you want to update and leave the other fields blank."), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "email",
        className: "form-label"
      }, "Email:"), /*#__PURE__*/React.createElement("input", {
        type: "email",
        className: "form-control",
        name: "email",
        placeholder: "Email",
        value: email,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "password",
        className: "form-label"
      }, "Password:"), /*#__PURE__*/React.createElement("input", {
        type: "password",
        className: "form-control",
        name: "password",
        placeholder: "Password",
        value: password,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "name",
        className: "form-label"
      }, "Name:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "name",
        placeholder: "Name",
        value: name,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "age",
        className: "form-label"
      }, "Age:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "age",
        placeholder: "Age",
        value: age,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "location",
        className: "form-label"
      }, "Location:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "location",
        placeholder: "Location",
        value: location,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "d-grid gap-2"
      }, /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "btn btn-primary"
      }, "Update Profile"))));
    }
  }]);
  return UserProfileUpdateForm;
}(React.Component);
window.UserProfileUpdateForm = UserProfileUpdateForm;