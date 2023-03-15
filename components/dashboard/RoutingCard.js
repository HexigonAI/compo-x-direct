import React from 'react';

const RoutingCard = ({ icon, title, route, remainingProjects }) => {
  return (
    <>
      {/* TODO add route path to this a href and turn it into a Link with next */}
      <a
        href='#'
        className='button-dark resource-button w-inline-block'
        style={{ marginTop: '0.75rem' }}
      >
        <div class='div-block-23'>
          <img src={icon} loading='lazy' width='18' alt='' />
          <div>{title}</div>
        </div>
        <div class='price-2'>{remainingProjects}</div>
      </a>
    </>
  );
};

export default RoutingCard;
