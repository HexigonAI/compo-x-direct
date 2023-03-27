import React from 'react';

const ProjectCard = ({ projectTitle, id, status}) => {
  return (
    <div className='style-guide-item narrow'>
      <div className='card'>
        <a href='#' className='w-inline-block'>
          <img
            src='../images/Frame-13239.svg'
            width='400'
            alt=''
            className='dashboard-image-preview'
          />
        </a>
        <div className='card-body'>
          <h5>{projectTitle}</h5>
          <p>{id}</p>
          {/* TODO: add in a status prop here */}
          <div className='account-state margin-10'>Live and Published</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
