import lowBattery from '../assets/battery-empty-solid.svg';
import mediumBattery from '../assets/battery-half-solid.svg';
import threequarterBattery from '../assets/battery-three-quarters-solid.svg';
import highBattery from '../assets/battery-full-solid.svg';
import { useState, useEffect } from 'react';

function Battery() {
    const [battery, setBattery] = useState(null);
    const [battery_img, setBatteryImg] = useState(highBattery);
    const [battery_level, setLevel] = useState(100);
    const [battery_charging, setCharging] = useState(false);

    useEffect(() => {
        if ("getBattery" in navigator) {
            navigator.getBattery().then((bat) => {
                setBattery(bat);
            });
        }
    }, []);

    useEffect(() => {
        if (!battery) return;

        setLevel(battery.level * 100);

        if (battery.level > 0.7) {
            setBatteryImg(highBattery);
        } else if (battery.level > 0.5) {
            setBatteryImg(threequarterBattery);
        } else if (battery.level > 0.3) {
            setBatteryImg(mediumBattery);
        } else {
            setBatteryImg(lowBattery);
        }

        setCharging(Battery.charging);
    }, [battery]);

    return (
        <div className='battery_section'>
            <div className='battery'>
                <img src={battery_img} alt="Batterie" />
                { battery_charging ? <p>En charge</p> : ''}
            </div>
            <p>{battery_level}%</p>
        </div>
    );
}

export default Battery;
