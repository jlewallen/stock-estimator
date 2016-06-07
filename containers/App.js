import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <Link to={'/layout'}>Layout</Link>
                {children}
            </div>
        );
    }
}

App.propTypes = {
    // Injected by React Redux
    pushState: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {
    pushState
})(App);