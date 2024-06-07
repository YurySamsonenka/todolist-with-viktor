import React, { ReactNode } from 'react';

type CrosesProps = {
  croses: ItemCros[]
  children?: ReactNode
}

type ItemCros = {
  id: number
  model: string
  size: string
}

export const SuperCroses = ({ croses, children }: CrosesProps) => {
  return (
    <div>
      <ul>
        {croses.map(c => {
          return (
            <li key={c.id}>
              <div>{c.model}</div>
              <div>{c.size}</div>
            </li>
          );
        })}
      </ul>
      {children}
      <hr />
    </div>
  );
};
