/**
 * require react-jsonschema-form and bootstrap
 * render inline fields
 * 
 * fork from:
 * https://raw.githubusercontent.com/mozilla-services/react-jsonschema-form/master/src/components/fields/ObjectField.js
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
} from "react-jsonschema-form/lib/utils";

class ObjectFields extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = name => {
    return (value, options) => {
      const newFormData = { ...this.props.formData, [name]: value };
      this.props.onChange(newFormData, options);
    };
  };

  render() {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      onBlur,
      onFocus,
      registry = getDefaultRegistry(),
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions);
    const title = schema.title === undefined ? name : schema.title;
    
    return (
      <fieldset>
        {(uiSchema["ui:title"] || title) &&
          <TitleField
            id={`${idSchema.$id}__title`}
            title={uiSchema["ui:title"] || title}
            required={required}
            formContext={formContext}
          />}
        {(uiSchema["ui:description"] || schema.description) &&
          <DescriptionField
            id={`${idSchema.$id}__description`}
            description={uiSchema["ui:description"] || schema.description}
            formContext={formContext}
          />}
        { this.renderPropertiesByFieldsets() }
      </fieldset>
    );
  }

  renderPropertiesByFieldsets() {
    const { uiSchema, schema } = this.props
    const properties = Object.keys(schema.properties)

    let fieldsets = getFieldsets(uiSchema)
    if (!fieldsets) {
      return this.renderProperties()
    }


    return (
      fieldsets.map((sets, index) => {
        if (!sets || sets.length.length === 0) {
          return null
        }
        let col = parseInt(12/sets.length, 0)

        return (
          <div className="row" key={`row-${index}`}>
            {
              sets.map((name, index) => {
                return (
                  <div className={`col-md-${col} col-xs-${col}`} 
                    key={`field-col-${name}`}>
                    { this.renderProperty(name, `field-${index}`) }
                  </div>
                )
              })
            }
          </div>
        )
      })
    )
  }

  renderProperties() {
    const {
      uiSchema,
      name,
      registry = getDefaultRegistry(),
    } = this.props;

    const { definitions } = registry;
    const schema = retrieveSchema(this.props.schema, definitions);

    let orderedProperties;
    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: "red" }}>
            Invalid {name || "root"} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>
            {JSON.stringify(schema)}
          </pre>
        </div>
      );
    }

    return (
      orderedProperties.map((name, index) => {
        return this.renderProperty(name, `field-${index}`)
      })
    )
  }

  renderProperty(name, key) {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      required,
      disabled,
      readonly,
      onBlur,
      onFocus,
      registry = getDefaultRegistry(),
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions);

    return (
      <SchemaField
        key={key}
        name={name}
        required={this.isRequired(name)}
        schema={schema.properties[name]}
        uiSchema={uiSchema[name]}
        errorSchema={errorSchema[name]}
        idSchema={idSchema[name]}
        formData={formData[name]}
        onChange={this.onPropertyChange(name)}
        onBlur={onBlur}
        onFocus={onFocus}
        registry={registry}
        disabled={disabled}
        readonly={readonly}
      />
    )
  }
}

if (process.env.NODE_ENV !== "production") {
  ObjectFields.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
  };
}


// helper
function getFieldsets(uiSchema) {
  let fieldsets = uiSchema['ui:fieldsets']
  if (!fieldsets || fieldsets.length === 0) {
    return null
  }
  return fieldsets
}

export default ObjectFields
