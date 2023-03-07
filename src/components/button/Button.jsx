import React from 'react';

import './button.css';

const Button = (props) => {
    return (
        <button
            style={{
                backgroundColor: props.type === 'inverted' ? 'none' : '#356EFF',
            }}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;