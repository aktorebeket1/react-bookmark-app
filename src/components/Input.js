import React from 'react';
import '../css/App.css';

export default function Input(props) {
  return (
    <input className={props.className} type={props.type} id={props.id} placeholder={props.placeholder}>
      {props.children}
    </input>
  );
}
