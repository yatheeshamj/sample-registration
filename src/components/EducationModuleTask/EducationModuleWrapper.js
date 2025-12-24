import React from "react";
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import EducationView from "../registration/validateAccount/EducationModule/Container";
import commonStyle from "../shared/CommonStyle.module.scss";

const EducationModuleWrapper = () => {
  return (
    <div className={`col-sm-12 col-xl-12 col-lg-12`}>
      <div
        className={`d-flex justify-content-center align-items-center pl-sm-4 pr-sm-4 pr-md-4 ${commonStyle["widthChange4"]}`}
      >
        <EducationView outstandingTask={true}/>
      </div>
    </div>
  );
};

export default MainLayoutFullNavAuthenticated(
  withRouter(EducationModuleWrapper)
);
