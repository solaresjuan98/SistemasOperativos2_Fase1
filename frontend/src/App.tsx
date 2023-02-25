import { useState } from 'react';
import './boostrap.min.css';
//import { Greet } from "../wailsjs/go/main/App";

//
import { CpuGraph } from './components/CpuGraph'
import { DiskGraph } from './components/DiskGraph';

function App() {
    // const [resultText, setResultText] = useState("Please enter your name below 👇");
    // const [name, setName] = useState('');
    // const updateName = (e: any) => setName(e.target.value);
    // const updateResultText = (result: string) => setResultText(result);

    // function greet() {
    //     Greet(name).then(updateResultText);
    // }

    return (

        <div className="container mt-5">
            <h1 className='mb-5'>Fase 1</h1>

            <div className="row">
                <div className="col-6" style={{ backgroundColor: '#ccc'}}>
                    <h1 className='text-dark'>CPU Usage</h1>

                    {/* ======= GRAPH ======= */}
                    <CpuGraph />

                </div>
                <div className="col-6" style={{ backgroundColor: '#ccc'}}>
                    <h1 className='text-dark'>Disk usage</h1>
                    {/* ======= GRAPH ======= */}
                    <DiskGraph />

                </div>

            </div>

        </div>

    )
}

export default App
