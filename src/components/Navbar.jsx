import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <React.Fragment>
            <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
                <div className="container">
                    <Link to={'/'} className='navbar-brand'>
                    <i class="fa-solid fa-user"></i> <span className='text-warning'>User Data</span>
                    </Link>
                </div>
            </nav>

            <h4 className='hompage-icon'><i class="fa-regular fa-hand-point-up"></i> Click on the above link to begin</h4>
        </React.Fragment>
    )
}
