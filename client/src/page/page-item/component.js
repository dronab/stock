import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useLocation
import { useDispatch } from 'react-redux';
import axios from 'axios';

import ComboBox from '../../component/dropdown/combo-box';
import FileList from '../../component/file-list/file-list';
import Uploader from '../../component/file-upload/file-upload';
import Cart from '../../component/cart/cart';

import { showMessageInfo, showMessageError } from '../../reducer/message'

import './component.css';

const listType = [
    { id: 1, text: 'Транзистор' },
    { id: 2, text: 'Микросхема' },
    { id: 3, text: 'Резистор' },
    { id: 4, text: 'N-P-N' },
    { id: 5, text: 'P-N-P' },
    { id: 6, text: 'Диод' },
    { id: 7, text: 'Светодиод' },
    { id: 8, text: 'Модуль' },
];
const packageType = [
    { id: 1, text: 'SOT-23' },
    { id: 2, text: 'SOIC8' },
    { id: 3, text: 'SOT-23-5' },
];

function Item() {
    const params = useParams();
    const [doc, setDoc] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!params.id) {
            return;
        }
        const fetchData = async () => {
            const result = await axios(`/item/${params.id}`);
            if (result.status === 200) {
                setDoc({ ...result.data });
            }
            if (result.data.status === 404) {
                dispatch(showMessageInfo('Компонент не найден'))
                navigate('/');
            }

        };
        fetchData();
    }, []);

    const [uploadFileList, addFile] = useState([]);

    const handleChange = (e) => {
        setDoc({ ...doc, [e.target.name]: e.target.value })
    }

    function prepare() {
        const { name, box, cell, count } = doc;
        if (!name) {
            dispatch(showMessageError('Нужно указать имя компонента'));
            return false;
        }
        if (!box) {
            dispatch(showMessageError('Нужно указать номер коробки'));
            return false;
        }
        if (!cell) {
            dispatch(showMessageError('Нужно указать номер ячейки'));
            return false;
        }
        if (count <= 0) {
            dispatch(showMessageError('Нужно указать кол-во компонентов'));
            return false;
        }
        return true;
    }

    const handleSave = () => {
        const doneDoc = prepare();
        if (!doneDoc) {
            return;
        }
        let url = `/item/${params.id}`;
        if (!params.id) {
            url = '/add';
        }
        const saveORadd = async () => {
            const result = await axios.post(url, doc);
            if (result.status === 200) {
                dispatch(showMessageInfo('Успешно сохранили'));
            }
        };
        saveORadd();
    }

    const handleDelete = () => {
        const del = async () => {
            const result = await axios.delete(`/item/${doc._id}/${doc._rev}`);
            if (result.status === 200) {
                dispatch(showMessageInfo('Компонент удален'));
                navigate('/');
            }
        };
        del();
    }

    return (
        <div>
            <div className='component-menu'>
                <div className='text-menu'>Компонент</div>
                <div className='action-button-container'>
                    {doc._id &&
                        <div className='many-button'>
                            <Cart idDoc={doc._id} count={doc.count} />
                            <button className='delete' onClick={handleDelete} >Удалить</button>
                        </div>
                    }
                    <button className='save' onClick={handleSave} >Сохранить</button>
                </div>
            </div>
            <div className='text-container'>
                <div className='text-data'>
                    <span>Название</span>
                    <input className='field' type='text' name='name' onChange={handleChange} value={doc.name || ''} />
                </div>
                <ComboBox title='Тип' name='type' data={listType} setValue={handleChange} onChange={handleChange} value={doc.type || ''} />
                <ComboBox title='Корпус' name='package' data={packageType} setValue={handleChange} onChange={handleChange} value={doc.package || ''} />
                <div className='text-data'>
                    <span>Кол-во</span>
                    <input className='field' type='number' name='count' onChange={handleChange} value={doc.count || ''} />
                </div>
                <div className='text-data'>
                    <span>Бокс (коробка)</span>
                    <input className='field' type='text' name='box' onChange={handleChange} value={doc.box || ''} />
                </div>
                <div className='text-data'>
                    <span>Ячейка (пакет)</span>
                    <input className='field' type='text' name='cell' onChange={handleChange} value={doc.cell || ''} />
                </div>
                <div className='text-data'>
                    <span>Параметры</span>
                    <input className='field' type='text' name='spec' onChange={handleChange} value={doc.spec || ''} />
                </div>
                <div className='text-data'>
                    <span>Описание</span>
                    <input className='field' type='text' name='description' onChange={handleChange} value={doc.description || ''} />
                </div>
                <div className='text-data'>
                    <span>Примечание</span>
                    <input className='field' type='text' name='note' onChange={handleChange} value={doc.note || ''} />
                </div>

            </div>
            <div>
                <Uploader addFile={addFile} uploadFileList={uploadFileList} idDoc={params.id} />
                <FileList />
            </div>
        </div>
    )
}

export default Item;
