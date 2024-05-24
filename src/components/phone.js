
function Phone(){
    const handlePhoneCall = (phone_number) => {
        window.location.href = `tel:${phone_number}`;
    }

    return (
        <div>
            <button onClick={() => handlePhoneCall('0771225772')}>Appeler</button>
        </div>
    )
}

export default Phone;