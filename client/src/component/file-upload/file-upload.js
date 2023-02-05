import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { showMessageInfo, showMessageError } from '../../reducer/message';
import attach from '../../image/attach.svg';

import './file-upload.css';

function Uploader(props) {
    const [selectedFile, onFileChange] = useState(null);
    const dispatch = useDispatch();

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        const response = await axios.post(`/upload/${props.idDoc}`, formData);
        if (response.data.code === 200) {
            dispatch(showMessageInfo('Файл успешно загружен'));
        }
        if (response.data.code === 500) {
            dispatch(showMessageError('Не удалось загрузить файл'))
        }
    };

    return (
        <div className='upload-container'>
            <span>Прикрепить файлы</span>
            <label className="custom-file-upload">
                <input type="file" onChange={(event) => onFileChange(event.target.files[0])} />
                <img className='icon-delete' src={attach} alt="Logo" width="24" height="24" />
                {selectedFile &&
                    <div>
                        <span>{selectedFile.name}</span>
                        <button className='upload-button' onClick={onFileUpload} >Загрузить</button>
                    </div>
                }
            </label>
        </div>
    );
}

export default Uploader;
