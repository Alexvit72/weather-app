import React from 'react';

interface Props {
  text: string
}


export default function NoDataComponent({ text }: Props) {
  return (
    <p className='absolute inset-0 my-auto mx-auto w-1/2 h-max text-center text-4xl'>{ text }</p>
  );
}
