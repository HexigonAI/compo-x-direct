import React from 'react';

const ProjectCard = ({projectTitle, icon, id, owner}) => {
  return (
    <div>
    {/* TODO add a route prop for respective projectID */}
      <a
        href='/site-dashboard/organization-grid'
        class='account-item w-inline-block'
      >
        <div class='account'>
          <div class='avatar-2 bg-1'>
            <img src={icon} alt='' class='org-avatar' />
          </div>
          <div class='account-user-datails'>
            <h6 class='mb-0'>
              <strong>{projectTitle}</strong>
            </h6>
            <div class='hint'>{owner}</div>
          </div>
          <div class='label-item'>Active</div>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
