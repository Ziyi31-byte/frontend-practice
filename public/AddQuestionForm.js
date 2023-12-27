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
// QuestionForm.jsx
// import React from 'react';
var AddQuestionForm = /*#__PURE__*/function (_React$Component) {
  _inherits(AddQuestionForm, _React$Component);
  var _super = _createSuper(AddQuestionForm);
  function AddQuestionForm() {
    var _this;
    _classCallCheck(this, AddQuestionForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      email: '',
      password: '',
      title: '',
      description: '',
      category: '',
      complexity: ''
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
        title = _this$state.title,
        description = _this$state.description,
        category = _this$state.category,
        complexity = _this$state.complexity;
      var auth = {
        email: email,
        password: password
      };
      var questionInput = {
        title: title,
        description: description,
        category: category === "" ? null : category,
        complexity: complexity === "" ? null : complexity
      };
      _this.props.onQuestionSubmit(auth, questionInput);
      _this.setState({
        email: '',
        password: '',
        title: '',
        description: '',
        category: '',
        complexity: ''
      });
    });
    return _this;
  }
  _createClass(AddQuestionForm, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        email = _this$state2.email,
        password = _this$state2.password,
        title = _this$state2.title,
        description = _this$state2.description,
        category = _this$state2.category,
        complexity = _this$state2.complexity;
      return /*#__PURE__*/React.createElement("div", {
        className: "container mt-4"
      }, /*#__PURE__*/React.createElement("h2", null, "Submit a Question"), /*#__PURE__*/React.createElement("p", null, "To submit a question, please enter the question id, your email and password for authorization purpose."), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "email"
      }, "Email:"), /*#__PURE__*/React.createElement("input", {
        type: "email",
        className: "form-control",
        name: "email",
        placeholder: "Email",
        value: email,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "password"
      }, "Password:"), /*#__PURE__*/React.createElement("input", {
        type: "password",
        className: "form-control",
        name: "password",
        placeholder: "Password",
        value: password,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "title"
      }, "Title:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "title",
        placeholder: "Question Title",
        value: title,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "description"
      }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
        className: "form-control",
        name: "description",
        placeholder: "Describe your question",
        value: description,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "category"
      }, "Category:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "category",
        placeholder: "Question Category",
        value: category,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "complexity"
      }, "Complexity:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "complexity",
        placeholder: "Question Complexity",
        value: complexity,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "btn btn-primary"
      }, "Submit"))));
    }
  }]);
  return AddQuestionForm;
}(React.Component);
window.AddQuestionForm = AddQuestionForm;