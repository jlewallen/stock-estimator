import React, { Component, PropTypes } from 'react';

export class StockSetPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { stockSets, onSelected } = this.props;

        return (
            <select className="form-control" onChange={(e) => onSelected(_(stockSets).filter({ id: Number(e.target.value) }).first())}>
                <option value=""></option>
                {stockSets.map(ss => (<option key={ss.id} value={ss.id}>{ss.name}</option>))}
            </select>
        );
    }
}

StockSetPicker.propTypes = {
    stockSets: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired
};
