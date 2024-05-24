
function Phone(){
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const handlePhoneCall = (phone_number) => {
        window.location.href = `tel:${phone_number}`;
    }

    return (
        <div>
            {
                isMobile() ?? <button onClick={() => handlePhoneCall('0771225772')}>Appeler</button>
            }
        </div>
    )
}

export default Phone;