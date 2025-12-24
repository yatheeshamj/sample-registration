import React from 'react'
import MainLayoutFullNavAuthenticated from '../layouts/MainLayoutFullNavAuthenticated'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import AssessmentView  from '../registration/validateAccount/assessment/Container'

const HarverAssessmentWrapper = () => {
  return <AssessmentView outstandingTask ={true}/>
}

export default MainLayoutFullNavAuthenticated(withRouter( HarverAssessmentWrapper ));
