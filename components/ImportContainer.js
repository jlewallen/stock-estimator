
import React, { Component, PropTypes } from 'react';

export class ImportContainer extends Component {
    render() {
        const { onImport, onHide } = this.props;

        return (
            <div className="export">
                <div className="row">
                    <div className="col-md-12">
                        <textarea className="form-control" ref="data"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn" onClick={() => onHide()}>Hide</button>
                        <button className="btn" onClick={() => onImport(JSON.parse(this.refs.data.value))}>Import</button>
                    </div>
                </div>
            </div>
        );
    }
}

ImportContainer.propTypes = {
    onHide: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired
};
