import React, { useEffect } from 'react';

function Webotp() {
    useEffect(() => {
        if ('OTPCredential' in window) {
            try {
                const input = document.querySelector('input[autoComplete="one-time-code"]');
                if (!input) return;
                
                const ac = new AbortController();
                const form = input.closest('form');
                
                if (form) {
                    form.addEventListener('submit', () => {
                        ac.abort();
                    });
                }
                
                const otp = navigator.credentials.get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal
                });
                
                if (otp && otp.code) {
                    input.value = otp.code;
                    if (form) form.submit();
                }
            } catch (err) {
                console.error('Error retrieving OTP:', err);
            }
        }
    }, []);

    return (
        <div>
            <h1>Web OTP</h1>
            <form>
                <input autoComplete="one-time-code" required />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Webotp;
