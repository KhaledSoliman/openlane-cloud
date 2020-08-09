/**
 * Pined List
 */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Scrollbars } from 'react-custom-scrollbars';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const PinedList = () => (
    <RctCollapsibleCard
        heading={<IntlMessages id="widgets.pinedSubHeader" />}
    >
        <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={260} autoHide>
            <List subheader={<div />}>
                {[0, 1, 2, 3, 4].map(sectionId => (
                    <div key={`section-${sectionId}`} className="listSection">
                        <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                        {['Chankya', 'Pepper', 'Adminify'].map(item => (
                            <ListItem button key={`Admin Theme-${sectionId}-${item}`}>
                                <ListItemText primary={`Admin Theme ${item}`} />
                            </ListItem>
                        ))}
                    </div>
                ))}
            </List>
        </Scrollbars>
    </RctCollapsibleCard>
);

export default PinedList;
