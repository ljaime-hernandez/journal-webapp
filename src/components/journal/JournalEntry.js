import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
        <div 
            className="journal__entry-picture"
            style={{
                backgroundSize: 'cover',
                backgroundImage: 'url(https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png)'
            }}
        >
        </div>
    
        <div className="journal__entry-body">
            <p className="journal__entry-title">
                New Day
            </p>
            <p className="journal__entry-content">
                ASDFASDFSDASFGSAdffgsaSDFGHDSWDF
                ASDFASDFASDFASDFASDFASDFSADFSADFASDFAS
                DFASDFASDFASDFASDFASDFASDFASDFSDFAS
            </p>
        </div>

        <div className="journal__entry-date-box">
            <span>Monday</span>
            <span>28</span>
        </div>
    </div>
  )
};
