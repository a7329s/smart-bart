import React, { Component } from 'react';
import NearByStn from './nearbystn';
class NearBy extends Component {
    stnlist(stns) {
        return stns.map(st => <NearByStn key={st.id} name={st.stn} sno={st.id}></NearByStn>)

    }
    render() {
        return (
            <div >
                
                <div>
                    
                            {this.stnlist(this.props.list)}
                        
                </div>
            </div>
        );
    }


}
export default NearBy;