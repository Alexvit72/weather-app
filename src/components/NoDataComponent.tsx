import React from 'react';

export interface Props {
  text: string
}


function NoDataComponent({ text }: Props) {
  return (
    <p className='absolute inset-0 my-auto mx-auto w-1/2 h-max text-center text-4xl'>{ text }</p>
  );
}

export default NoDataComponent;
