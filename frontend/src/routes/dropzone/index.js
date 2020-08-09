//Dropzone

import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class Dropzone extends Component {
   constructor(props) {
      super(props);

      // For a full list of possible configurations,
      // please consult http://www.dropzonejs.com/#configuration
      this.djsConfig = {
         addRemoveLinks: true,
         acceptedFiles: "image/jpeg,image/png,image/gif"
      };

      this.componentConfig = {
         iconFiletypes: ['.jpg', '.png', '.gif'],
         showFiletypeIcon: true,
         postUrl: '/'
      };

      // If you want to attach multiple callbacks, simply
      // create an array filled with all your callbacks.
      // this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

      // // Simple callbacks work too, of course
      // this.callback = () => console.log('Hello!');

      // this.success = file => console.log('uploaded', file);

      // this.removedfile = file => console.log('removing...', file);

      this.dropzone = null;
   }

   render() {
      const config = this.componentConfig;
      const djsConfig = this.djsConfig;

      // For a list of all possible events (there are many), see README.md!
      const eventHandlers = {
         init: dz => this.dropzone = dz,
         drop: this.callbackArray,
         addedfile: this.callback,
         success: this.success,
         removedfile: this.removedfile
      }

      return (
         <div className="dropzone-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.dropzone" />} match={this.props.match} />
            <div className="row">
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-12"
                  heading={<IntlMessages id="sidebar.dropzone" />}
               >
                  <DropzoneComponent
                     config={config}
                     eventHandlers={eventHandlers}
                     djsConfig={djsConfig}
                  />
               </RctCollapsibleCard>
            </div>
         </div>
      )
   }
}
export default Dropzone;
