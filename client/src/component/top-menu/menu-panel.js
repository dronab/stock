import { useNavigate, useLocation } from 'react-router-dom';

import './menu-panel.css';

function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    function backClick() {
        navigate(-1);
    }
    function addClick() {
        navigate('/item');
    }
    function cartClick() {
        navigate('/cart');
    }
    return (
        <header className='Menu-Container'>
            <div className='Back-Space'>
                {location.pathname != '/' &&
                    <button className='Button-Outline' onClick={backClick}>Назад</button>
                }
            </div>
            <div>
                <div className='Menu-Logo'>
                    <span>Stock</span>
                </div>
            </div>
            <div className='AddAndCart-Space'>
                {location.pathname != '/cart' &&
                    <button className='Button-Outline' onClick={cartClick}>Корзина</button>
                }
                {location.pathname === '/' &&
                    <button className='Button-Normal' onClick={addClick}>Добавить</button>
                }
            </div>
        </header>

    )
}

export default TopMenu;
