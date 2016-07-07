import React, { Component, PropTypes } from 'react';

export class StockSetEditor extends Component {
    constructor(props) {
        super(props);
        this.removeRow = this.removeRow.bind(this);
    }

    removeRow(board, index) {
        const { stockSet, onChange } = this.props;

        if (index >= 0) {
            const newStockSet = _.cloneDeep(stockSet);
            newStockSet.available.splice(index, 1);
            onChange(newStockSet);
        }
    }

    renderRow(board, index) {
        const { stockSet, onChange } = this.props;

        const bindControl = (property) => {
            return (e) => {
                const newStockSet = _.cloneDeep(stockSet);
                if (index >= 0) {
                    _.extend(newStockSet.available[index], { [property]: Number(e.target.value) });
                }
                else {
                    newStockSet.available.push(_.extend(board, { [property]: Number(e.target.value) }));
                }
                onChange(newStockSet);
            };
        };

        return (
            <tr key={board.id}>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.thickness} onBlur={bindControl('thickness')} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.width} onBlur={bindControl('width')} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.length} onBlur={bindControl('length')} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.perBoardFoot} onBlur={bindControl('perBoardFoot')} /></td>
                <td><button className="btn btn-warning" onClick={() => this.removeRow(board, index)}>Remove</button></td>
            </tr>
        );
    }

    render() {
        const { stockSet } = this.props;

        if (!stockSet.id) {
            return (<div></div>);
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Thickness</th>
                        <th>Width</th>
                        <th>Length</th>
                        <th>$/bdft</th>
                    </tr>
                </thead>
                <tbody>
                    {stockSet.available.map((board, index) => this.renderRow(board, index))}
                    {this.renderRow({ id: _.uniqueId('b') }, -1)}
                </tbody>
            </table>
        );
    }
}

StockSetEditor.propTypes = {
    stockSet: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
