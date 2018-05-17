"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("react-jsonschema-form/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * require react-jsonschema-form and bootstrap
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * render inline fields
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * fork from:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://raw.githubusercontent.com/mozilla-services/react-jsonschema-form/master/src/components/fields/ObjectField.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ObjectFields = function (_Component) {
  _inherits(ObjectFields, _Component);

  function ObjectFields() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectFields);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectFields.__proto__ || Object.getPrototypeOf(ObjectFields)).call.apply(_ref, [this].concat(args))), _this), _this.onPropertyChange = function (name) {
      return function (value, options) {
        var newFormData = _extends({}, _this.props.formData, _defineProperty({}, name, value));
        _this.props.onChange(newFormData, options);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectFields, [{
    key: "isRequired",
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          uiSchema = _props.uiSchema,
          formData = _props.formData,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          name = _props.name,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          _props$registry = _props.registry,
          registry = _props$registry === undefined ? (0, _utils.getDefaultRegistry)() : _props$registry;
      var definitions = registry.definitions,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions);
      var title = schema.title === undefined ? name : schema.title;

      return _react2.default.createElement(
        "fieldset",
        null,
        (uiSchema["ui:title"] || title) && _react2.default.createElement(TitleField, {
          id: idSchema.$id + "__title",
          title: uiSchema["ui:title"] || title,
          required: required,
          formContext: formContext
        }),
        (uiSchema["ui:description"] || schema.description) && _react2.default.createElement(DescriptionField, {
          id: idSchema.$id + "__description",
          description: uiSchema["ui:description"] || schema.description,
          formContext: formContext
        }),
        this.renderPropertiesByFieldsets()
      );
    }
  }, {
    key: "renderPropertiesByFieldsets",
    value: function renderPropertiesByFieldsets() {
      var _this2 = this;

      var _props2 = this.props,
          uiSchema = _props2.uiSchema,
          schema = _props2.schema;

      var properties = Object.keys(schema.properties);

      var fieldsets = getFieldsets(uiSchema);
      if (!fieldsets) {
        return this.renderProperties();
      }

      return fieldsets.map(function (sets, index) {
        if (!sets || sets.length.length === 0) {
          return null;
        }
        var col = parseInt(12 / sets.length, 0);

        return _react2.default.createElement(
          "div",
          { className: "row", key: "row-" + index },
          sets.map(function (name, index) {
            return _react2.default.createElement(
              "div",
              { className: "col-md-" + col + " col-xs-" + col,
                key: "field-col-" + name },
              _this2.renderProperty(name, "field-" + index)
            );
          })
        );
      });
    }
  }, {
    key: "renderProperties",
    value: function renderProperties() {
      var _this3 = this;

      var _props3 = this.props,
          uiSchema = _props3.uiSchema,
          name = _props3.name,
          _props3$registry = _props3.registry,
          registry = _props3$registry === undefined ? (0, _utils.getDefaultRegistry)() : _props3$registry;
      var definitions = registry.definitions;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions);

      var orderedProperties = void 0;
      try {
        var properties = Object.keys(schema.properties);
        orderedProperties = (0, _utils.orderProperties)(properties, uiSchema["ui:order"]);
      } catch (err) {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "p",
            { className: "config-error", style: { color: "red" } },
            "Invalid ",
            name || "root",
            " object field configuration:",
            _react2.default.createElement(
              "em",
              null,
              err.message
            ),
            "."
          ),
          _react2.default.createElement(
            "pre",
            null,
            JSON.stringify(schema)
          )
        );
      }

      return orderedProperties.map(function (name, index) {
        return _this3.renderProperty(name, "field-" + index);
      });
    }
  }, {
    key: "renderProperty",
    value: function renderProperty(name, key) {
      var _props4 = this.props,
          uiSchema = _props4.uiSchema,
          formData = _props4.formData,
          errorSchema = _props4.errorSchema,
          idSchema = _props4.idSchema,
          required = _props4.required,
          disabled = _props4.disabled,
          readonly = _props4.readonly,
          onBlur = _props4.onBlur,
          onFocus = _props4.onFocus,
          _props4$registry = _props4.registry,
          registry = _props4$registry === undefined ? (0, _utils.getDefaultRegistry)() : _props4$registry;
      var definitions = registry.definitions,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions);

      return _react2.default.createElement(SchemaField, {
        key: key,
        name: name,
        required: this.isRequired(name),
        schema: schema.properties[name],
        uiSchema: uiSchema[name],
        errorSchema: errorSchema[name],
        idSchema: idSchema[name],
        formData: formData[name],
        onChange: this.onPropertyChange(name),
        onBlur: onBlur,
        onFocus: onFocus,
        registry: registry,
        disabled: disabled,
        readonly: readonly
      });
    }
  }]);

  return ObjectFields;
}(_react.Component);

ObjectFields.defaultProps = {
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false
};


if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    uiSchema: _propTypes2.default.object,
    errorSchema: _propTypes2.default.object,
    idSchema: _propTypes2.default.object,
    onChange: _propTypes2.default.func.isRequired,
    formData: _propTypes2.default.object,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    registry: _propTypes2.default.shape({
      widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
      fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
      definitions: _propTypes2.default.object.isRequired,
      formContext: _propTypes2.default.object.isRequired
    })
  };
}

// helper
function getFieldsets(uiSchema) {
  var fieldsets = uiSchema['ui:fieldsets'];
  if (!fieldsets || fieldsets.length === 0) {
    return null;
  }
  return fieldsets;
}

exports.default = ObjectFields;