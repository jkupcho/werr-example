import React from 'react';

export default ({children}) => {
  return (
    <div>
      <p>Header</p>
      <div>
        {children}
      </div>
    </div>
  )
}