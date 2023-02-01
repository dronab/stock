import { useState, useEffect } from 'react';
import axios from 'axios';

import useDebounce from '../../util/useDebounce';
import ListComponents from '../../component/list/list-component';

import './main-screen.css';

function MainScreen() {
    const [inputValue, setText] = useState(null);
    const [dataItems, setNewData] = useState([]);
    const debouncedTitle = useDebounce(inputValue, 400);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/components', {
                params: { text: inputValue || null }
            });
            setNewData(result.data.docs);
        };
        fetchData()
    }, [debouncedTitle]);

    function handleSearch(e) {
        setText(e.target.value.trim());
    }

    return (
        <div>
            <div className='search-div'>
                <input className='search-input' placeholder='Найти'
                    onChange={handleSearch}
                />
            </div>
            <div className='list-div'>
                <div className='info-div'>
                    <span>Список компонентов</span>
                </div>
                <ListComponents data={dataItems} />
            </div>
        </div>
    )
}

export default MainScreen;
