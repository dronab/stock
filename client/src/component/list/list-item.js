import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './list-item.css';

function ListItem() {
    const [data, getList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('/all',);
            if(result.status === 200) {
                getList(result.data.docs);
            }
            if(result.status === 500) {
                getList([]);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    function openClick(props) {
        navigate(`/item/${props}`);
    }

    return (
        <div className='list'>
            {data.map(function (item) {
                return (
                    <div key={item._id} className='item'>
                        <div className='item-info'>
                            <div className='open-target' onClick={() => openClick(item._id)}>{item.name}</div>
                            <div className='item-type'>{item.type}</div>
                        </div>
                        <div className='item-stor'>
                            <div className='item-stor-index-main item-stor-index'>
                                <span className='item-stor-box'>Коробка</span>
                                <span className='item-stor-cell'>{item.box}</span>
                            </div>
                            <div className='item-stor-index-main item-stor-index2'>
                                <span className='item-stor-box'>Ячейка</span>
                                <span className='item-stor-cell'>{item.cell}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
            {!data.length &&
                <div className='empty-list'>
                    Пусто
                </div>
            }
        </div>
    )
}

export default ListItem;
