/**
 * Notes Widget 
 */
/* eslint-disable */
import React from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

const Notes = () => (
  <div className="lazy-up">
    <div className="card pt-30 mb-20">
      <span className="text-pink d-block mb-5"><IntlMessages id="widgets.note" /></span>
      <p className="fs-14 mb-10">This project is currently under development. Please report any bugs or issues to us.</p>
        <p className="fs-14 mb-10">Github Repository: <a>https://github.com/KhaledSoliman/openlane-cloud</a></p>
    </div>
  </div>
);

export default Notes;
