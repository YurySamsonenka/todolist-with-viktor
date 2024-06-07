import React, { ButtonHTMLAttributes } from 'react';
import s from './superButton.module.css';

type SuperButtonPropsType = {
  backGround?: string
} & ButtonHTMLAttributes<HTMLButtonElement> & Omit<ColorsProps, 'color4' | 'color5'>

type ColorsProps = {
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  color5?: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = (props: SuperButtonPropsType) => {
  const {
    onClick, color, children, className, disabled, ...rest
  } = props;

  // const finalClassName = s.button
  //   + (disabled
  //      ? ' ' + s.disabled
  //      : color === 'red'
  //        ? ' ' + s.red
  //        : color === 'secondary'
  //          ? ' ' + s.secondary
  //          : ' ' + s.default)
  //   + (className ? ' ' + className : '');

  // const finalClassName = s.button + ' ' + s.red
  // const finalClassName = `
  // ${s.button}
  // ${color === 'red' ? s.red : s.default}
  // ${disabled ? s.button : ''}
  // `;
  const finalClassName = `
  ${s.button}
  ${color === 'red' ? s.red : color === 'secondary' ? s.secondary : s.default}
  ${disabled ? s.button : ''}
  `;

  return (<button className={finalClassName} onClick={onClick}>{children}</button>);
};
