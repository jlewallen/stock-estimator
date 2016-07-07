import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

export class StockSetPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { stockSets, onSelected, selected } = this.props;

        console.log(selected);

        return (
            <select className="form-control" onChange={(e) => onSelected(_(stockSets).filter({ id: e.target.value }).first())} defaultValue={selected ? selected.id : null}>
                <option value=""></option>
                {stockSets.map(ss => (<option key={ss.id} value={ss.id}>{ss.name}</option>))}
            </select>
        );
    }
}

StockSetPicker.propTypes = {
    stockSets: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    selected: PropTypes.object
};
