/**
 * Chip
 */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import TagFacesIcon from '@material-ui/icons/TagFaces';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class ChipsArray extends React.Component {

  state = {
    chipData: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ],
  }

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  };

  render() {
    return (
      <div className="chip-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.chip" />} match={this.props.match} />
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.chipWithClickEvent" />}
        >
          <div className="row">
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Default</h5>
              <Chip className="bg-warning text-white mr-10 mb-10" label="Basic Chip" />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Chip With Text Avatar</h5>
              <Chip className="bg-success text-white mr-10 mb-10" avatar={<Avatar>MB</Avatar>} label="Clickable Chip" onClick={handleClick} />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Chip With Avatar</h5>
              <Chip className="bg-primary text-white mr-10 mb-10" avatar={<Avatar src={require('Assets/img/user-5.jpg')} />} label="Deletable Chip" />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Chip With Avatar</h5>
              <Chip className="bg-danger text-white mr-10 mb-10" avatar={<Avatar src={require('Assets/img/user-5.jpg')} />} label="Deletable Chip" onDelete={handleDelete} />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Chip With Icon Avatar</h5>
              <Chip outline="true" className="bg-info text-white mr-10 mb-10" avatar={<Avatar><FaceIcon /></Avatar>} label="Deletable Chip" onClick={handleClick} onDelete={handleDelete} />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Custom Clickable Chip</h5>
              <Chip className="bg-success text-white mr-10 mb-10" label="Custom delete icon Chip" onClick={handleClick} onDelete={handleDelete} deleteIcon={<DoneIcon />} />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Outline Chip</h5>
              <Chip className="chip-outline-primary mr-10 mb-10" label="Custom delete icon Chip" />
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center p-20" colClasses="col-sm-6 col-lg-4 col-xl-3">
              <h5 className="mb-20">Disable Chip</h5>
              <Chip disabled className="bg-warning text-white mr-10 mb-10" avatar={<Avatar src={require('Assets/img/user-4.jpg')} />} label="Disabled Chip" onDelete={handleDelete} />
            </RctCollapsibleCard>
          </div>
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.chipArray" />}
        >
          {this.state.chipData.map(data => {
            let avatar = null;
            if (data.label === 'React') {
              avatar = (
                <Avatar>
                  <TagFacesIcon />
                </Avatar>
              );
            }
            return (
              <Chip className="bg-primary text-white mr-10 mb-10" key={data.key} avatar={avatar} label={data.label} onDelete={this.handleDelete(data)} />
            );
          })}
        </RctCollapsibleCard>
      </div>
    );
  }
}

export default ChipsArray;
