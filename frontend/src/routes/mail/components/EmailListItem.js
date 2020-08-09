/**
 * Email List Item
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

// helpers functions
import { textTruncate } from 'Helpers/helpers';

const EmailListItem = ({ email, onSelectEmail, handleMarkAsStar, onReadEmail, getTaskLabelNames }) => (
    <li className="d-flex justify-content-between align-items-center list-item" onClick={onReadEmail}>
        <div className="d-flex align-items-center w-100">
            <div className="checkbox-wrap">
                <Checkbox
                    checked={email.selected}
                    onClick={onSelectEmail}
                />
            </div>
            <div className="icon-wrap">
                <IconButton onClick={handleMarkAsStar} className="mx-10 d-none d-sm-block">
                    <i className={classnames('zmdi zmdi-star', { 'text-warning': email.starred })}></i>
                </IconButton>
            </div>
            <div className="emails media w-100">
                <div className="avatar-wrap w-10 align-self-center">
                    {email.from.avatar !== '' ?
                        <img src={email.from.avatar} alt="mail user" className="rounded-circle mr-15 align-self-center" width="40" height="40" />
                        : <Avatar className="mr-15 align-self-center">{email.from.name.charAt(0)}</Avatar>
                    }
                </div>
                <div className="media-body d-flex align-items-center w-90">
                    <div className="d-inline-block w-25">
                        <h5 className="mb-1">{email.user_name }</h5>
                        <span className="font-xs d-inline-block">{textTruncate(email.email_subject, 30)}</span>
                    </div>
                    <p className="font-xs text-muted w-75 d-inline-block mb-0 mx-4">{textTruncate(email.email_content, 120)}</p>
                </div>
            </div>
        </div>
        <div className="font-xs text-muted w-10 text-right">{email.received_time}</div>
    </li>
);

export default EmailListItem;
