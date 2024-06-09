import { useState } from 'react'
import '../../styles/style.css'

type VehicleType = {
    name: string,
    checked: boolean,
    value: string
}

export const NavProducts = () => {
    const [vehicleValues, setVehicleValues] = useState<VehicleType[]>([
        { name: 'MOTOR', checked: false, value: 'Mocil' },
        { name: 'MOGE', checked: false, value: 'Moge' },
        { name: 'MOBIL', checked: false, value: 'Mobil' },
    ]);

    const handleVehicleChange = (idx: number) => {
        setVehicleValues((prevValues) => {
            const updatedValues = prevValues.map((vehicle, index) => ({
            ...vehicle,
            checked: index === idx ? !vehicle.checked : false, 
            }));
            return updatedValues;
        });
    };
    
    return (
        <div className="nav-container">
            <nav className="nav-2">
                {vehicleValues.map((vehicle, idx) => (
                    <a
                        href="#"
                        key={idx} 
                        onClick={() => handleVehicleChange(idx)}
                        style={{
                            fontWeight: vehicle.checked ? 'bold' : 'normal', 
                            color: vehicle.checked ? 'blue' : 'black'
                        }}
                    >
                        {vehicle.name}
                    </a>
                ))}
            </nav>
        </div>
    )
}