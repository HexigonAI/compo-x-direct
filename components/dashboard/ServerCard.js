import React from 'react';

const ServerCard = ({serverTitle, icon, description}) => {
  return (
    <div>
      <div
        className='account-item w-inline-block'
      >
        <div className='account'>
          <div className='avatar-2 bg-1'>
            <img src={'../images/server.svg'} alt='' className='org-avatar' />
          </div>
          <div className='account-user-datails'>
            <h6 className='mb-0'>
              <strong>{serverTitle}</strong>
            </h6>
            <div className='hint'>{description}</div>
          </div>
          <div className='label-item'>Active</div>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
