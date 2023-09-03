import React from 'react';
import spin from '../images/Spinner-1s-200px.gif';

function Spinner() {
    return (
        <React.Fragment>   
            <div>
                <img src={spin} alt="" className='d-block m-auto' style={{width: '150px'}}/>
            </div>
        </React.Fragment>
    )
}

export default Spinner