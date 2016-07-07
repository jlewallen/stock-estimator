import React, { Component, PropTypes } from 'react';

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

export class SplitPane extends Component {
    constructor() {
        super();
        this.state = {
            side: null
        };
    }

    showRight() {
        this.setState({
            side: RIGHT
        });
    }

    showLeft() {
        this.setState({
            side: LEFT
        });
    }

    render() {
        const { left, right, float, enabled } = this.props;
        const { side } = this.state;

        return (
            <div className="row">
                <div className="col-md-6" onMouseEnter={() => this.showLeft()}>
                    {side == RIGHT && enabled ? float : left}
                </div>
                <div className="col-md-6" onMouseEnter={() => this.showRight()}>
                    {side == LEFT && enabled ? float : right}
                </div>
            </div>
        )
    }
}

SplitPane.propTypes = {
    left: PropTypes.object.isRequired,
    right: PropTypes.object.isRequired,
    float: PropTypes.object.isRequired,
    enabled: PropTypes.bool.isRequired
};
