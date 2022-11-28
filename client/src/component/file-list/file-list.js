// import { useState } from 'react';

import del from '../../image/close.svg';
import down from '../../image/download.svg';
import './file-list.css';

function FileList({ data }) {
    return (
        <div className='file-container'>
            {data.map(function (item) {
                return (
                    <div key={item.id} className='file-item'>
                        <div>{item.text}</div>
                        <div className='item-button'>
                            <img className='image-button' src={del} alt="Logo" width="24" height="24" />
                            <img className='image-button' src={down} alt="Logo" width="24" height="24" />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default FileList;
