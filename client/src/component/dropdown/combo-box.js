import { useState } from 'react';
import './combo-box.css';

function ComboBox({ title, name, data, setValue, value }) {
  const [visible, setShow] = useState(false);

  function hide(text) {
    setValue({
      target: {
        name: name,
        value: text
      }
    })
    setShow(false)
  }

  return (
    <div>
      <div className='text-data'>
        <span>{title}</span>
        <input
          className='field2'
          type='text'
          name={name}
          value={value}
          onChange={(e) => setValue(e)}
        />
        <button className='expand' onClick={() => setShow(!visible)}>...</button>
        {visible &&
          <div className='drop-down'>
            {data.map(function (item) {
              return (
                <div
                  key={item.id}
                  className='combo-item'
                  onClick={() => hide(item.text)}
                >{item.text}</div>
              );
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default ComboBox;
