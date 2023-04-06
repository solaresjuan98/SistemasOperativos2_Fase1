import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { GetRamUsage } from '../../wailsjs/go/main/App';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'RAM Usage Chart',
        },
    },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


export const RamGraph = () => {

    const [value, setValue] = useState('');
    const [totalRam, setTotalRam] = useState('');

    const [last15, setLast15] = useState<any>(Array(15).fill(0));
    const [datos, setDatos] = useState<string[]>([]);

    //
    const updateResultText = (result: string) => setValue(result);
    const updateTotalRam = (ramValue:string) => setTotalRam(ramValue);


    const data = {
        labels,
        datasets: [
            {
                label: 'RAM Used (GB)',
                data:  last15.map((i: string) => parseFloat(i)), // * En GB
                borderColor: '#3E9DC9',
                backgroundColor: '#1AA2E1',
            }
        ],
    };

    function showMemUsage() {

        GetRamUsage().then(updateResultText);


    }


    useEffect(() => {

        const intervalo = setInterval(() => {

            showMemUsage();
            console.log(value);
            // * Agregar al arreglo global de datos
            setDatos([...datos, value]);

            setLast15(datos.slice(-15));
            // if (datos.length > 15) {
            //   setLast15(datos.slice(-15));
            // }


        }, 3000)


        return () => clearInterval(intervalo);


    }, [datos])


    return (
        <div className='container'>

            <Line options={options} data={data} />
            <br />
        </div>

    );
}
  
  
  