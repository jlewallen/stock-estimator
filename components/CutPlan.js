import React, { Component, PropTypes } from 'react';

import { BoardDiagram } from './BoardDiagram';

export class CutPlan extends Component {
    render() {
        const { plan } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="board-diagrams">
                            {plan.boards.map(board => (
                                <div key={board.id} className="board-diagram">
                                    <p>{board.thickness} x {board.length}</p>
                                    <p>{board.efficiency.toFixed(2)}%</p>
                                    <BoardDiagram board={board} allBoards={plan.boards} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4>Purchase List</h4>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Thickness</th>
                                    <th>Width</th>
                                    <th>Length</th>
                                    <th>Boards</th>
                                    <th>Linear Feet</th>
                                    <th>Bdft</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plan.purchase.map(board => (
                                    <tr key={board.id}>
                                        <td>{board.thickness}</td>
                                        <td>{board.width}</td>
                                        <td>{board.length}</td>
                                        <td>{board.quantity}</td>
                                        <td>{board.feet}</td>
                                        <td>{board.bdft}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

CutPlan.propTypes = {
    plan: PropTypes.object.isRequired
};
