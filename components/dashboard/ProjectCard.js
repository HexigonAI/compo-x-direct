import React from 'react';

const ProjectCard = ({ projectTitle, id, status}) => {
  return (
    <div class='style-guide-item narrow'>
      <div class='card'>
        <a href='#' class='w-inline-block'>
          <img
            src='../images/Frame-13239.svg'
            width='400'
            alt=''
            class='dashboard-image-preview'
          />
        </a>
        <div class='card-body'>
          <h5>{projectTitle}</h5>
          <p>{id}</p>
          {/* TODO: add in a status prop here */}
          <div class='account-state margin-10'>Live and Published</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
