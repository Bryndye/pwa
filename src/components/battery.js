import lowBattery from '../assets/battery-empty-solid.svg';
import mediumBattery from '../assets/battery-half-solid.svg';
import threequarterBattery from '../assets/battery-three-quarters-solid.svg';
import highBattery from '../assets/battery-full-solid.svg';

let battery;

if ("getBattery" in navigator) {
  navigator.getBattery().then((bat) => {
    battery = bat;
    
    battery.addEventListener("chargingchange", updateChargeInfo);
    battery.addEventListener("levelchange", updateLevelInfo);
    battery.addEventListener("chargingtimechange", updateChargingInfo);
    battery.addEventListener("dischargingtimechange", updateDischargingInfo);
  });
  
  function updateChargeInfo() {
    console.log("Battery en charge ? " + (battery.charging ? "Oui" : "Non"));
  }
  
  function updateLevelInfo() {
    console.log("Niveau de batterie : " + battery.level * 100 + "%");
  }
  
  function updateChargingInfo() {
    console.log(
      "Temps avant charge de la batterie : " +
        battery.chargingTime +
        " secondes"
    );
  }
  
  function updateDischargingInfo() {
    console.log(
      "Temps avant décharge de la batterie : " +
        battery.dischargingTime +
        " secondes"
    );
  }
}

export default function getBattery() {
    if (!battery) {
        return '';
    }
    let battery_svg;
    if (battery.level > 0.7) {
        battery_svg = highBattery;
    } else if (battery.level > 0.5) {
        battery_svg = threequarterBattery;
    }
    else if (battery.level > 0.3) {
        battery_svg = mediumBattery;
    }
    else {
        battery_svg = lowBattery;
    }
    return '<img src="' + battery_svg + '" alt="battery" />';
}