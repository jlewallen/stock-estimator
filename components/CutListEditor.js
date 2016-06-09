import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

export class CutListEditor extends Component {
    constructor(props) {
        super(props);
        this.removeRow = this.removeRow.bind(this);
    }

    removeRow(board, index) {
        const { cutList, onChange } = this.props;

        if (index >= 0) {
            const newCutList = _.cloneDeep(cutList);
            newCutList.necessary.splice(index, 1);
            onChange(newCutList);
        }
    }

    renderRow(board, index) {
        const { cutList, onChange } = this.props;

        const bindControl = (property, transform) => {
            return (e) => {
                const newCutList = _.cloneDeep(cutList);
                if (index >= 0) {
                    _.extend(newCutList.necessary[index], { [property]: transform(e.target.value) });
                }
                else {
                    newCutList.necessary.push(_.extend(board, { [property]: transform(e.target.value) }));
                }
                onChange(newCutList);
            };
        };

        const classes = classNames({
            hovering: board.hovering,
            unavailable : board.unavailable
        });

        return (
            <tr key={board.id} className={classes}>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.quantity} onBlur={bindControl('quantity', v => Number(v))} /></td>
                <td><input type="text"   className="col-xs-2 form-control" defaultValue={board.name} onBlur={bindControl('name', v => v)} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.thickness} onBlur={bindControl('thickness', v => Number(v))} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.width} onBlur={bindControl('width', v => Number(v))} /></td>
                <td><input type="number" className="col-xs-2 form-control" defaultValue={board.length} onBlur={bindControl('length', v => Number(v))} /></td>
                <td style={{backgroundColor: '#' + board.color}}>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td><button className="btn btn-warning" onClick={() => this.removeRow(board, index)}>Remove</button></td>
            </tr>
        );
    }

    render() {
        const { cutList } = this.props;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Thickness</th>
                        <th>Width</th>
                        <th>Length</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cutList.necessary.map((board, index) => this.renderRow(board, index))}
                    {this.renderRow({ id: _.uniqueId('b') }, -1)}
                </tbody>
            </table>
        );
    }
}

CutListEditor.propTypes = {
    cutList: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
