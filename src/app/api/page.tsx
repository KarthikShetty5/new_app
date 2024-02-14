'use client'
import { useState, useEffect } from 'react';
import axios from 'axios'

const Api = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/data');  // Update the URL accordingly
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Your Component</h1>
            {data && (
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Api;
