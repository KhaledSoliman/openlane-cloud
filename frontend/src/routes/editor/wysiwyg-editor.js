/**
 * Wysiwyg Editor
 */
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class EditorComponent extends Component {
  render() {
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.wysiwygEditor" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.wysiwygEditor" />}>
          <Editor wrapperClassName="rct-editor-wrapper" editorClassName="rct-wysiwyg-editor" toolbarClassName="toolbar-class" />
        </RctCollapsibleCard>
      </div>
    );
  }
}


export default EditorComponent;
