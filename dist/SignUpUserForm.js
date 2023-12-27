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
// import React from 'react';
var SignUpUserForm = /*#__PURE__*/function (_React$Component) {
  _inherits(SignUpUserForm, _React$Component);
  var _super = _createSuper(SignUpUserForm);
  function SignUpUserForm() {
    var _this;
    _classCallCheck(this, SignUpUserForm);
    _this = _super.call(this);
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
      var userData = {
        email: email,
        password: password,
        profile: {
          name: name,
          age: age,
          location: location
        }
      };
      _this.props.handleSignUpUser(userData);
    });
    return _this;
  }
  _createClass(SignUpUserForm, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        email = _this$state2.email,
        password = _this$state2.password,
        name = _this$state2.name,
        age = _this$state2.age,
        location = _this$state2.location;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Sign Up"), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "email"
      }, "Email:"), /*#__PURE__*/React.createElement("input", {
        type: "email",
        name: "email",
        placeholder: "Email",
        value: email,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "password"
      }, "Password:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "password",
        placeholder: "Password",
        value: password,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "name"
      }, "Name:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name",
        value: name,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "age"
      }, "Age:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "age",
        placeholder: "Age",
        value: age,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "location"
      }, "Location:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "location",
        placeholder: "Location",
        value: location,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Sign Up")));
    }
  }]);
  return SignUpUserForm;
}(React.Component);
window.SignUpUserForm = SignUpUserForm;