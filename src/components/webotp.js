import {React, useEffect} from 'react';

function Webotp(){
    useEffect(() => {
        if ('OTPCredential' in window) {
            window.addEventListener('DOMContentLoaded', e => {
                const input = document.querySelector('input[autoComplete="one-time-code"]');
                if (!input) return;
                    const ac = new AbortController();
                    const form = input.closest('form');
                if (form) {
                    form.addEventListener('submit', e => {
                    ac.abort();
                    });
                }
                navigator.credentials.get({
                    otp: { transport:['sms'] },
                    signal: ac.signal
                }).then(otp => {
                    input.value = otp.code;
                    if (form) form.submit();
                }).catch(err => {
                    console.log(err);
                });
            });
        }
    }, []);

      

    return (
        <div>
            <h1>Web OTP</h1>
            {/* <p>Your OTP is : {}</p> */}
            <form>
                <input autoComplete="one-time-code" required/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Webotp;