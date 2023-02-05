import { useNavigate } from 'react-router-dom';

import './list-component.css';

function ListComponents({ data }) {
    const navigate = useNavigate();

    function openClick(props) {
        navigate(`/part/${props}`);
    }

    return (
        <div className='list'>
            {data && data.map(function (item) {
                return (
                    <div key={item._id} className='item' onClick={() => openClick(item._id)}>
                        <div className='item-info'>
                            <div className='open-target'>{item.name}</div>
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
            {!data &&
                <div className='empty-list'>
                    Пусто, нет компонентов
                </div>
            }
        </div>
    )
}

export default ListComponents;
