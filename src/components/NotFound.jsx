import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const NotFound = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        // Implement retry logic here
        // For example, you can use navigate to go back to the previous route
        navigate(-1); // Go back one step in the history stack (equivalent to clicking the browser's back button)
    };

    return (
        <div className='Home' style={{}}>
            <h1>Page Not Found</h1>
            <p>Sorry, the requested page could not be found.</p>
            <Button type="primary" style={{ width: '50%' }} onClick={handleRetry}>Retry</Button>
        </div>
    );
};

export default NotFound;
