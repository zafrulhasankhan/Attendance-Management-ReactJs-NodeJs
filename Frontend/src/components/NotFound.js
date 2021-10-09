import React from 'react';
import { Alert } from 'react-bootstrap';

function NotFound(props) {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '17px'

            }}>
                <Alert className="alert col-md-6 text-center br-5" variant="dark">
                   <h2>404 | Not Found </h2>
                    
                </Alert>
            </div>
        </div>
    );
}

export default NotFound;