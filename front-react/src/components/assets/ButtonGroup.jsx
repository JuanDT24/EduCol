import React, { useState } from 'react';
import Button from './Button'; // Import your existing Button component
import './ButtonGroup.css'; // Import your CSS for styling the button group

function ButtonGroup({ buttons }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index, onClick) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      onClick?.();
    }
  };

  return (
    <div className="button-group">
      {buttons.map((button, index) => ( 
        <Button
          key={index}
          label={button.label}
          onClick={() => handleClick(index, button.onClick)}
          disabled={index !== activeIndex}
          variant={index === activeIndex ? 'primary' : 'outline'}
        />
      ))}
    </div>
  );
}