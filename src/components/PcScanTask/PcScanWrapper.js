import React from 'react'
import PcScan from '../registration/validateAccount/pcscan/PcScan'
import MainLayoutFullNavAuthenticated from '../layouts/MainLayoutFullNavAuthenticated'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const PcScanWrapper = () => {
  return <PcScan outstandingTask={true}/>
}

export default MainLayoutFullNavAuthenticated(withRouter( PcScanWrapper));
