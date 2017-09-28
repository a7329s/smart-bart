import React, { Component } from 'react';

class station extends Component {
    constructor(props) {
        super(props);
    }
 stnlist(stns)
{
var indents = [];
        stns.forEach(function(stn) {
            indents.push(<li>{stn.key}</li>);
        }, this);
        return indents;
    }
    render() {
        return (
            <div>
                <p>Your nearest station(s) are: </p>
                <ul>
                    {this.stnlist(this.props.list)}
                </ul>                
            </div>
        );
    }


}
export default station;