import React, { Component } from 'react';
import _ from 'lodash'
class Destination extends Component {
    destinations(props) {
        if (props.hasETD){
            return props.dest.map(st => <div className="listDiv" key={st.destination}><span className="list" key={st.destination}>{st.destination}&nbsp;</span><span className={'route-spacer route-'.concat(st.estimate[0].color)}></span><span className="spanrht">
                {
                    //(st.estimate.reduce(function (prev=[], curr) { return [...prev, curr.minutes.toString()] }))
                    _.map(st.estimate,'minutes').join(', ') + ' min'

                }</span></div>)
        }
    }
    render() {
        return (

            <div >
                {this.destinations(this.props)}
            </div>
        );
    }
}

export default Destination;