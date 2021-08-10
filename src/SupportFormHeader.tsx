import React from 'react';
import './SupportFormHeader.css';
import appIcon from './img/owl_app_icon_backgroundless.svg';

class SupportFormHeader extends React.Component<any, any> {

    render() {
        return (
            <div className="SupportFormHeader">
                <img id="AppIcon" src={appIcon} alt="Logo" />
                <label id="FormTitle">Awake</label>
            </div>
        );
    }
}

export default SupportFormHeader;
