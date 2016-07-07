import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

export class CutListPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cutLists, onSelected, selected } = this.props;

        return (
            <select className="form-control" onChange={(e) => onSelected(_(cutLists).filter({ id: e.target.value }).first())} defaultValue={selected ? selected.id : null}>
                <option value=""></option>
                {cutLists.map(cl => (<option key={cl.id} value={cl.id}>{cl.name}</option>))}
            </select>
        );
    }
}

CutListPicker.propTypes = {
    cutLists: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    selected: PropTypes.object
};
