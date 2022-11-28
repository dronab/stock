import { useState } from 'react';
import axios from 'axios';

import attach from '../../image/attach.svg';

import './file-upload.css';

function Uploader() {
    const [selectedFile, onFileChange] = useState(null);

    // const onFileChange = event => {
    //     selectedFile = event.target.files[0]
    // };
    // console.log('selectedFile', selectedFile);

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append(
            'file',
            selectedFile,
            selectedFile.name
        );
        const response = await axios.post("/upload", formData);
    };

    return (
        <div className='upload-container'>
            <span>Прикрепить файлы</span>
            <label className="custom-file-upload">
                <input type="file" onChange={(event) => onFileChange(event.target.files[0])} />
                <img src={attach} alt="Logo" width="24" height="24" />
                <span>Выбрать файл</span>
                <button className='upload-button' onClick={onFileUpload} >Загрузить</button>
            </label>
        </div>
    )
}

export default Uploader;
