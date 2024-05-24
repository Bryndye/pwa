import React, { useState, useEffect } from 'react';

function Webotp() {
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if ("OTPCredential" in window) {
            const ac = new AbortController();

            navigator.credentials
                .get({
                    otp: { transport: ["sms"] },
                    signal: ac.signal,
                })
                .then((otp) => {
                    setOtp(otp.code);
                    ac.abort();
                })
                .catch((err) => {
                    ac.abort();
                    console.log(err);
                });
        }
    }, []);

    return (
        <div>
            <h1>Web OTP</h1>
            <p>{otp}</p>
        </div>
    );
}

export default Webotp;