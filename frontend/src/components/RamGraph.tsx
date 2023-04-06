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

import { DiskUsage } from '../../wailsjs/go/main/App';


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
            text: 'Disk Usage Chart',
        },
    },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

interface MemUsage {
    availableMemory: string,
    usedMemory: string,
    sizeMemory: string,
    percMemory: string
}


export const RamGraph = () => {

    const [value, setValue] = useState('');


    const [last15, setLast15] = useState<any>(Array(15).fill(0));
    const [datos, setDatos] = useState<string[]>([]);

    //
    const updateResultText = (result: string) => setValue(result);

    const data = {
        labels,
        datasets: [
            {
                label: 'Disk Used (GB)',
                data:  last15.map((i: string) => parseInt(i)/1024), // * En Gg
                borderColor: '#3E9DC9',
                backgroundColor: '#1AA2E1',
            },
        ],
    };

    function showMemUsage() {

        DiskUsage().then(updateResultText);

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

            {/* <h6>{datos.slice(-15)}</h6> */}
            {/* <button className="btn btn-primary" onClick={showMemUsage}> Get data </button> */}
        </div>

    );
}
  
  
  