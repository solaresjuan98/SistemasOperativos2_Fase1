import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm'
import { GetUSBDevices, CopyFile } from '../../wailsjs/go/main/App';


export const UsbCopy = () => {


    const [usbDevices, setUsbDevices] = useState([]);


    const [deviceSelected, setDeviceSelected] = useState('');

    const { formData, onChangeForm, isNotEmpty } = useForm({
        filePath: '',
        usbPath: ''
    });

    const handleSeleted = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setDeviceSelected(event.target.value);
    };


    const onCopyToUSB = () => {
        // console.log(usbDevices.length);

        console.log(deviceSelected);

        if (isNotEmpty(formData.filePath)) {
            CopyFile(formData.filePath, `/media/snowman/${deviceSelected}/`).then();
        }

    }

    const onCopyFromUSB = () => {

        console.log(deviceSelected);
        if (isNotEmpty(formData.usbPath)) {
            // source, dest
            CopyFile(formData.usbPath, "/home/snowman/Downloads/").then();
        }

    }

    const updateDevices = (devices: any) => setUsbDevices(devices)

    useEffect(() => {

        GetUSBDevices().then(updateDevices);

        return () => {

        }
    }, [])


    return (
        <>
            <div className="col-2">
                <label htmlFor="">Select USB device</label>
                <select onChange={handleSeleted}>
                    <option value="">
                        Select a device
                    </option>
                    {
                        usbDevices.map((device, index) => (

                            (device !== "") && (
                                <option key={index} value={device}>
                                    {device}
                                </option>

                            )
                        ))
                    }
                </select>


            </div>

            {/* * ======= COPY TO USB =======  */}
            <div className="col-5">
                <h3 className="mt-1">Copy a file to USB</h3>

                <div className="row">
                    <div className="col-8">
                        <input
                            type="text"
                            name="filePath"
                            id="filePath"
                            value={formData.filePath}
                            onChange={onChangeForm}
                            placeholder='Write file path'
                            className="form-control"
                        />
                    </div>
                    <div className="col-4" onClick={onCopyToUSB}>
                        <button className="btn btn-success">Copy</button>
                    </div>
                </div>
            </div>

            {/* * ======= COPY FROM USB =======  */}
            <div className="col-5">
                <h3 className="mt-1">Copy a file from the USB</h3>

                <div className="row">
                    <div className="col-8">
                        <input
                            type="text"
                            name="usbPath"
                            id="usbPath"
                            value={formData.usbPath}
                            onChange={onChangeForm}
                            placeholder='Write file path'
                            className="form-control" />


                    </div>
                    <div className="col-4">
                        <button className="btn btn-success" onClick={onCopyFromUSB}>Copy</button>
                    </div>
                </div>
            </div>


        </>
    )
}
