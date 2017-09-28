import Destination from './destination';
import React, { Component } from 'react';
import { fetchETD } from '../actions';
import { connect } from 'react-redux';
import logoBart from '../img/train.svg';


class NearByStn extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchETD(this.props.name, this.props.sno - 1));
    }

    stnlist(destinations) {
        return destinations.map(st => <NearByStn key={st.id} name={st.stn} sno={st.id}></NearByStn>)

    }
    render() {
        return (


            <div className="rowDiv">
                
                <div className="rowDiv headDiv">
                    <img src={logoBart} className="App-logo-small" alt="logo" />
                    {this.props.etdStnName} : {this.props.etdr}
                </div>

                <div >
                    <Destination key={this.props.sno} hasETD={this.props.hasETD} dest={this.props.destn}></Destination>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    if (state.nearby[ownProps.sno - 1].hasETD) {
        return {
            etdStnName: state.nearby[ownProps.sno - 1].etd.root.station[0].name,
            destn: state.nearby[ownProps.sno - 1].etd.root.station[0].etd,
            etdr: state.nearby[ownProps.sno - 1].etd.root.time,
            hasETD: state.nearby[ownProps.sno - 1].hasETD
        }
    }
    else
        return {
            etdr: '',
            hasETD: false
        }
}
export default connect(mapStateToProps)(NearByStn);