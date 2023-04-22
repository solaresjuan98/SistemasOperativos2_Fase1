import { useState, useEffect } from 'react';
import { DiskUsage, GetDiskSize, GetTotalRam, BlockUSBPorts } from '../wailsjs/go/main/App';
import './boostrap.min.css';
//import { Greet } from "../wailsjs/go/main/App";

//
import { CpuGraph } from './components/CpuGraph'
import { DiskGraph } from './components/DiskGraph';
import { RamGraph } from './components/RamGraph';
import { useForm } from './hooks/useForm';

function App() {
    // const [name, setName] = useState('');
    // const updateName = (e: any) => setName(e.target.value);
    //const [result, setResult] = useState('');
    const [diskSize, setDiskSize] = useState(0);
    const updateSize = (result: string) => setDiskSize(parseInt(result) / 1024);


    const [used, setUsed] = useState(0);
    const updateUsed = (result: string) => setUsed(parseInt(result) / 1024);

    const [totalRam, setTotalRam] = useState(0);
    const updateRAM = (result: string) => setTotalRam(parseFloat(result));


    // * Form 
    const { formData, onChangeForm } = useForm({
        username: '',
        password: ''
    });

    const onLoginBlock = () => {

        BlockUSBPorts().then();
    }

    function getSize() {
        GetDiskSize().then(updateSize);
        DiskUsage().then(updateUsed);
        GetTotalRam().then(updateRAM);
    }

    useEffect(() => {


        const intervalo = setInterval(() => {

            getSize();
            // let temp = (parseInt(result)/1024);
            // setDiskSize(temp);

        }, 3000);

        return () => clearInterval(intervalo);

    }, [diskSize])



    return (

        <div className="container mt-3">
            <h1 className='mb-2'>Proyecto Fase 1</h1>
            <pre>
                Juan Antonio Solares {"\n"}
                Sistemas Operativos 2 {"\n"}
                Carnet 201800496
            </pre>
            <hr />

            <div className="row">
                <div className="col-6">
                    <h3>Disk size: </h3> <pre>{diskSize}{" "}GB</pre>
                    <h3>Free space: </h3> <pre>{diskSize - used}{" "}GB</pre>
                    <h3>Total RAM: </h3> <pre>{totalRam}{" "}GB</pre>
                </div>
                <div className="col-6">
                    <h3>
                        USB ports
                    </h3>

                    <label htmlFor="" >
                        Username
                    </label>

                    <input type="text" name="username" id="username" value={formData.username} onChange={onChangeForm} className='form-control' />

                    <label htmlFor="">
                        Password
                    </label>

                    <input type="password" name="password" id="password" value={formData.password} onChange={onChangeForm} className='form-control' />

                    <button className='btn btn-primary mt-3 mb-3' onClick={onLoginBlock}>
                        Block ports
                    </button>


                </div>
            </div>


            <div className="row">
                <div className="col-4" style={{ backgroundColor: '#ccc' }}>
                    <h1 className='text-dark text-center'>CPU Usage</h1>

                    {/* ======= GRAPH ======= */}
                    <CpuGraph />

                </div>
                <div className="col-4" style={{ backgroundColor: '#ccc' }}>
                    <h1 className='text-dark text-center'>Disk usage</h1>
                    {/* ======= GRAPH ======= */}
                    <DiskGraph />

                </div>
                <div className="col-4" style={{ backgroundColor: '#ccc' }}>

                    <h1 className="text-dark text-center">RAM usage</h1>

                    <RamGraph />
                </div>




            </div>

        </div>

    )
}

export default App
