import React from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const widgetData = {
  user: {
    title: 'EMPLOYEES',
    isMoney: false,
    link: 'See all employees',
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: 'crimson',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        }}
      />
    ),
  },
  earning: {
    title: 'SOCIAL',
    isMoney: true,
    link: 'View details',
    icon: (
      <MonetizationOnOutlinedIcon
        className="icon"
        style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
      />
    ),
  },
};

const Widget = ({ type }) => {
  const data = widgetData[type] || {}; // Use widget data based on type, default to an empty object

  const amount = 100;
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && '$'} {amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
