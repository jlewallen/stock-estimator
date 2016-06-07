import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectStockSet, selectCutList } from '../actions';

import { CutListPicker } from '../components/CutListPicker';
import { CutListEditor } from '../components/CutListEditor';
import { StockSetPicker } from '../components/StockSetPicker';
import { StockSetEditor } from '../components/StockSetEditor';
import { CutPlan } from '../components/CutPlan';

class LayoutPage extends Component {
    constructor(props) {
        super(props);
        this.handlePickStockSet = this.handlePickStockSet.bind(this);
        this.handlePickCutList = this.handlePickCutList.bind(this);
    }

    handlePickStockSet(stockSet) {
        this.props.selectStockSet(stockSet);
    }

    handlePickCutList(cutList) {
        this.props.selectCutList(cutList);
    }

    render() {
        const { stockSets, cutLists, currentStockSet, currentCutList, buy } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <CutListPicker cutLists={cutLists} onSelected={this.handlePickCutList} />
                    </div>
                    <div className="col-md-6">
                        <StockSetPicker stockSets={stockSets} onSelected={this.handlePickStockSet} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {currentCutList.id ? <CutListEditor cutList={currentCutList} onChange={cutList => this.handlePickCutList(cutList)} /> : <div/>}
                    </div>
                    <div className="col-md-6">
                        {currentStockSet.id ? <StockSetEditor stockSet={currentStockSet} onChange={stockSet => this.handlePickStockSet(stockSet)} /> : <div/>}
                    </div>
                </div>

                {buy ? <CutPlan plan={buy} /> : <div/>}
            </div>
        );
    }
}

LayoutPage.propTypes = {
    stockSets: PropTypes.array.isRequired,
    cutLists: PropTypes.array.isRequired,
    selectCutList: PropTypes.func.isRequired,
    selectStockSet: PropTypes.func.isRequired,
    buy: PropTypes.object
};

function mapStateToProps(state) {
    return {
        stockSets: state.stockSets,
        cutLists: state.cutLists,
        currentCutList: state.currentCutList,
        currentStockSet: state.currentStockSet,
        buy: state.buy.buy
    };
}

export default connect(mapStateToProps, {
    selectCutList,
    selectStockSet
})(LayoutPage);
