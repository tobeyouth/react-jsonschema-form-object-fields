import schema from './schema.json'
import uiSchema from './ui.json'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Form from 'react-jsonschema-form'
import ObjectFields from './../src/index'

class DemoForm extends Component {

  static propTypes = {
    formData: PropTypes.object
  }

  static defaultProps = {
    formData: {}
  }
  
  onSubmit = (data) => {
    const {errors, formData} = data
    console.log('errors', errors)
    console.log('formData', formData)
  }

  render() {
    let {formData} = this.props
    let fields = {
      'fields': ObjectFields
    }

    return (
      <div className='main'>
        <Form schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          fields={fields}
          onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default DemoForm
