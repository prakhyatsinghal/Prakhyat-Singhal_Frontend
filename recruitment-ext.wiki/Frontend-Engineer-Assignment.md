# React Component Code Review

## Introduction

Based on the code below answer the following queries:
1. Explain what the simple `List` component does.
Ans. The given code defines a simple list component in React that takes an array of items as a prop and displays them in an unordered list format. Each item in the list has a click handler that selects the item and highlights it with a green background. The selected item is highlighted by changing its background color to green, and the previously selected item (if any) is unselected by changing its background color to red.

2. What problems / warnings are there with code?
Ans. 
A. The setSelectedIndex hook in the List component is being used incorrectly. It should be called with an initial value, such as setSelectedIndex(0).
B. The isSelected prop in the WrappedSingleListItem component is being passed a boolean value, but it should be passed the selected index. This will cause the background color to always be green, regardless of which item is selected.
C. The propTypes validation for the items prop in the WrappedListComponent is incorrect. The correct syntax should be PropTypes.arrayOf(PropTypes.shape({...})).

3. Please fix, optimize, and/or modify the component as much as you think is necessary.
Ans. {Added a separate folder for the working code}
## Code

```javascript

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [setSelectedIndex, selectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;


```