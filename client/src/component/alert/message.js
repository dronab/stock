import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'

import { hideMessage } from '../../reducer/message'

import del from '../../image/close.svg';
import './message.css';

const Container = styled.div`
    background: #93f5d4;
    ${props => props.type === 'error' && `
    background: #f0553a;
    `}
`;

function Message() {
    const state = useSelector(state => state);
    const { show, textMessage, typeMessage } = state.msg;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(hideMessage());
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideMessage());
        }, 3000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const msg = (
        <div className='container'>
            <Container type={typeMessage} className='message'>
                <span>{textMessage}</span>
                <img src={del} alt="Logo" width="16" height="16" onClick={handleClick} />
            </Container>
        </div>


    )
    return show ? msg : null
}

export default Message;
