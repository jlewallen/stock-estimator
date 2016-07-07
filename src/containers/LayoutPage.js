import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    selectStockSet, selectCutList, planCuts, hoverOverBoards,
    newCutList, newStockSet,
    clearAll, exportAll, importAnything, resetAll
} from '../actions';

import { CutListPicker } from '../components/CutListPicker';
import { CutListEditor } from '../components/CutListEditor';
import { StockSetPicker } from '../components/StockSetPicker';
import { StockSetEditor } from '../components/StockSetEditor';
import { CutPlan } from '../components/CutPlan';
import { ImportContainer } from '../components/ImportContainer';
import { ExportContainer } from '../components/ExportContainer';
import { Help } from '../components/Help';
import { SplitPane } from '../components/SplitPane';

const ImportExport = {
    NONE: "NONE",
    IMPORT: "IMPORT",
    EXPORT: "EXPORT"
};

class LayoutPage extends Component {
    constructor(props) {
        super(props);
        this.handlePickStockSet = this.handlePickStockSet.bind(this);
        this.handlePickCutList = this.handlePickCutList.bind(this);
        this.handleHoverOverBoards = this.handleHoverOverBoards.bind(this);
        this.state = {
            importExport: ImportExport.NONE
        };
    }

    tryAndPlan(nextProps)  {
        const { currentStockSet, currentCutList, planCuts, buy } = nextProps;
        if (!buy.id && currentStockSet.id && currentCutList.id) {
            planCuts(currentStockSet, currentCutList);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.tryAndPlan(nextProps);
    }

    handlePickStockSet(stockSet) {
        this.props.selectStockSet(stockSet);
    }

    handlePickCutList(cutList) {
        this.props.selectCutList(cutList);
    }

    handleHoverOverBoards(boards) {
        this.props.hoverOverBoards(boards);
    }

    handleNewStockSet() {
        this.props.newStockSet({ name: 'New Stock Set' });
    }

    handleNewCutList() {
        this.props.newCutList({ name: 'New Cut List' });
    }

    handleClear() {
        this.props.clearAll();
    }

    handleExport() {
        this.props.exportAll();
    }

    handleReset() {
        this.props.resetAll();
    }

    handleImport(data) {
        if (data) {
            this.props.importAnything(data);
        }
        this.updateImportExport(ImportExport.NONE);
    }

    handleStartExport() {
        this.props.exportAll();

        this.updateImportExport(ImportExport.EXPORT);
    }

    handleStartImport() {
        this.updateImportExport(ImportExport.IMPORT);
    }

    updateImportExport(importExport) {
        this.setState({
            importExport: importExport
        });
    }

    // TOOD: Move to a component.
    renderImportExport() {
        const { exported } = this.props;
        const { importExport } = this.state;

        if (importExport == ImportExport.EXPORT) {
            return (<ExportContainer onHide={() => this.updateImportExport(ImportExport.NONE)} exported={exported} />);
        }

        if (importExport == ImportExport.IMPORT) {
            return (<ImportContainer onHide={() => this.updateImportExport(ImportExport.NONE)} onImport={data => this.handleImport(data)} />);
        }
        return (<div/>);
    }

    render() {
        const { stockSets, cutLists, currentStockSet, currentCutList, buy } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 btn-group">
                        <button className="btn btn-info" onClick={() => this.handleStartExport()}>Export</button>
                        <button className="btn btn-info" onClick={() => this.handleStartImport()}>Import</button>
                        <button className="btn btn-warning" onClick={() => this.handleClear()}>Clear</button>
                        <button className="btn btn-warning" onClick={() => this.handleReset()}>Reset</button>
                    </div>
                </div>
                {this.renderImportExport()}
                <SplitPane
                    enabled={_.isString(buy.id)}
                    left={(
                        <div>
                            <center><h4>Cut Lists</h4></center>
                            <div className="row">
                                <div className="col-md-11"><CutListPicker cutLists={cutLists} onSelected={this.handlePickCutList} /></div>
                                <div className="col-md-1"><button className="btn btn-primary" onClick={() => this.handleNewCutList()}>New</button></div>
                            </div>
                            <div>
                                <CutListEditor cutList={currentCutList} onChange={cutList => this.handlePickCutList(cutList)} />
                            </div>
                        </div>
                    )}
                    right={(
                        <div>
                            <center><h4>Stock Sets</h4></center>
                            <div className="row">
                                <div className="col-md-11"><StockSetPicker stockSets={stockSets} onSelected={this.handlePickStockSet} /></div>
                                <div className="col-md-1"><button className="btn btn-primary" onClick={() => this.handleNewStockSet()}>New</button></div>
                            </div>
                            <div>
                                <StockSetEditor stockSet={currentStockSet} onChange={stockSet => this.handlePickStockSet(stockSet)} />
                            </div>
                        </div>
                    )}
                    float={(
                        <div className="float">
                            <CutPlan plan={buy} onHoverOverBoards={this.handleHoverOverBoards} />
                        </div>
                    )}
                    />
            </div>
        );
    }
}

LayoutPage.propTypes = {
    stockSets: PropTypes.array.isRequired,
    cutLists: PropTypes.array.isRequired,
    selectCutList: PropTypes.func.isRequired,
    selectStockSet: PropTypes.func.isRequired,
    newStockSet: PropTypes.func.isRequired,
    newCutList: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
    exportAll: PropTypes.func.isRequired,
    importAnything: PropTypes.func.isRequired,
    buy: PropTypes.object
};

function mapStateToProps(state) {
    return {
        stockSets: state.stockSets,
        cutLists: state.cutLists,
        currentCutList: state.currentCutList,
        currentStockSet: state.currentStockSet,
        buy: state.buy,
        exported: state.exported
    };
}

export default connect(mapStateToProps, {
    selectCutList,
    selectStockSet,
    planCuts,
    hoverOverBoards,
    newStockSet,
    newCutList,
    clearAll,
    exportAll,
    importAnything,
    resetAll
})(LayoutPage);
