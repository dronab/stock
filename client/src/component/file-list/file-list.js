import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { showMessageInfo, showMessageError } from '../../reducer/message';

import del from '../../image/close.svg';
import './file-list.css';

function FileList() {
    const [fileList, setList] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();

    const fetchData = async () => {
        const result = await axios(`/files/attached/${params.id}`);
        setList(result.data);
    };

    useEffect(() => {
        fetchData();
    }, [params.id])

    async function handleDeleteFile(id, name) {
        const result = await axios.delete(`/files/attached/${id}/${name}`);
        if(result.data.code === 200){
            dispatch(showMessageInfo('Файл успешно загружен'));
        }
        if(result.data.code === 500) {
            dispatch(showMessageError(result.data.msg))
        }
        fetchData();
    }

    return (
        <div className='file-container'>
            {fileList.map(function (item) {
                return (
                    <div key={item.id} className='file-item'>
                        <div>
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={`/files/${params.id}/${item.text}`}
                                target="_blank" download
                            >{item.text}</Link>
                        </div>
                        <div className='item-button'>
                            <img
                                className='image-button' src={del}
                                onClick={() => handleDeleteFile(params.id, item.text)}
                                alt="del" width="24" height="24" />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default FileList;
