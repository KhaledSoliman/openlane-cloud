/**
 * Quill Editor
 */
import React, { Component } from 'react';
import ReactQuill from 'react-quill';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean'],
    [{ 'align': [] }],
    ['code-block']
  ],
};

const formats = [
  'header',
  'font',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'align',
  'code-block'
];

class QuillEditor extends Component {

  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.quillEditor" />} match={this.props.match} />
        <RctCollapsibleCard heading="Quill Editor">
          <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." />
        </RctCollapsibleCard>
      </div>
    );
  }
}

export default QuillEditor;
