import React from 'react'
import TestAcceptance from './test_acceptance'

const UserStories = ({ userStories }) => {

  return (
    <div style={{}} className="root">
      <center><h1>User Stories</h1></center>
      {userStories.map((story) => (
        <div style={{marginTop:10, marginLeft:20}}>
        <div className="card"  style={{display:"table-cell",width:500}}>
          <div className="card-body">
          <h5 className="card-title" >User Story #US-{story.storyId} {story.storyName}</h5>
            <h6 className="card-subtitle mb-2">{story.storyDesc}</h6>
            <br/>
            <div className="card-text">Priority : {story.storyPriority}</div>
            <div className="card-text">Cost : {story.storyCost}</div>
          </div>
        </div>
        <span style={{display:"table-cell",padding:"5px"}}></span>
        <div className="card"  style={{display:"table-cell",width:500}}>
          <div className="card-body">
          <h5 className="card-title">Confirmation #US-{story.storyId}</h5>
            <ol>
              <TestAcceptance testAcceptance= {story.testAcceptance}/>
            </ol>
          </div>
        </div>
        </div>
      ))}
      <br/>
    </div>
  )
};

export default UserStories