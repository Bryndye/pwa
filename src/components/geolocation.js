import React, { useState, useEffect } from 'react';

function Geolocation(){

    // GEOLOCATION //
    const [geolocation, setGeolocation] = useState(null);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position);
        })
    }, []);


    return(
        <div>
            {geolocation && (
                <div>
                    <p>{geolocation.coords.latitude}</p>
                    <p>{geolocation.coords.longitude}</p>
                </div>
              )}
        </div>
    )
}

export default Geolocation;