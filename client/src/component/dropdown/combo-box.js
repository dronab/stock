import './combo-box.css';

function ComboBox({ title, name, data, setValue, value }) {
    return (
        <div>
            <div className='text-data'>
                <span>{title}</span>
                <input
                    className='field2'
                    name={name}
                    value={value}
                    type="text"
                    list={name}
                    onChange={(e) => setValue(e)}
                />
                <datalist id={name}>
                    {data.map(function (item) {
                        return (
                            <option key={item.id} value={item.text} />
                        );
                    })}
                </datalist>
            </div>
        </div>
    )
}

export default ComboBox;
