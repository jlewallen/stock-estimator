import React, { Component, PropTypes } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';

export class ExportContainer extends Component {
    render() {
        const { exported, onHide } = this.props;

        return (
            <div className="export">
                <div className="row">
                    <div className="col-md-12">
                        <textarea className="form-control" readonly="yes" defaultValue={exported.all}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn" onClick={() => onHide()}>Hide</button>
                        <CopyToClipboard text={exported.all}
                            onCopy={() => onHide()}>
                            <button className="btn">Copy to clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        );
    }
}

ExportContainer.propTypes = {
    onHide: PropTypes.func.isRequired,
    exported: PropTypes.object.isRequired
};
