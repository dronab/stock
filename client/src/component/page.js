import { useNavigate } from 'react-router-dom';

import ListItem from './list/list-item';

import './page.css';

function Page() {
    const navigate = useNavigate();

    function addClick() {
        navigate('/item');
    }

    return (
        <div className='comfort-size'>
            <div className='manage'>
                <input className='search' placeholder='Найти' />
            </div>
            <div className='top-menu'>
                <button className='add' onClick={addClick} >Добавить</button>
            </div>
            <div className='listmenu'>
                <div className='info'>
                    <span>Список компонентов</span>
                </div>
                <ListItem />
            </div>
        </div>
    )
}

export default Page;
