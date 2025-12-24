import React, { Component, Fragment } from "react";

import { Translate } from "spotify-shared-web/localize";


import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import Buttonspotify from "spotify-shared-web/components/common/Button";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { Parser } from 'html-to-react';

// const FormBody = ({ agreementsToSign, formProps }) => {
//     const choices = ["true"];
//     return (
//         <Fragment>
//             <Field
//                 required
//                 value={formProps.values.JamaicaConsent}
//                 name="JamaicaConsent"
//                 label={`I understand that i need to provide PII for JM BGC`}
//                 hint={null}
//                 options={choices.map((key) => {
//                     return { value: true, label: "JamaicaConsent" };
//                 })}
//                 id="JamaicaConsent"
//                 component={Checkbox}
//             />
//             <div>
//                 <p>Legal Agreement</p>
//                 {agreementsToSign!=null && agreementsToSign.map((aggrement, key) => (
//                     <div
//                         key={key}
//                         className="mt-4 mb-4 row align-items-center"
//                     >
//                         <div className="col">{aggrement.templateName}</div>
//                         <div className="col-auto">
//                             {aggrement.isSigned === false && (
//                                 <Buttonspotify
//                                     disabled={aggrement.isSigned || isMobileDevice}
//                                     onClick={() =>
//                                         onViewSignAgreementClick(aggrement)
//                                     }
//                                 >
//                                     {translate("View & Sign")}
//                                 </Buttonspotify>
//                             )}
//                             {aggrement.isSigned && (
//                                 <div className={"signed"}>Signed</div>
//                             )}
//                         </div>
//                         <div className="mt-4 col-12">
//                             <div className="separator"></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </Fragment>
//     )
// }

const htmlToReactParser = new Parser()
class JamaicaConsentModal extends Component {
    constructor(props) {
        super(props);
    }

    // validationSchema() {
    //     let schemaObj = {};
    //     schemaObj["JamaicaConsent"] = Yup.boolean()
    //         .required()
    //         .oneOf([true], "you must accept to the terms");
    //     return Yup.object(schemaObj);
    // }

    render() {
        const { isVisible, isModalVisible, onSubmitSave, onHide, agreementSigning, onViewSignAgreementClick } = this.props;
        return (
            <Translate>
                {({ translate }) => (
                    <Fragment>
                        <ModalWithFormWrapper
                            id={"ClosedWindow"}
                            title={"Jamaica Legal Consent"}
                            isVisible={isModalVisible}
                            onHide={onHide}
                            onSubmit={onSubmitSave}
                            hideApply={true}
                            hideCancel={true}
                            closeButton={false}
                            backdrop="static"
                            centered={true}
                            showClearAndHide={false}
                            isInitialValid={true}
                        >
                            <Fragment>

                                {agreementSigning.data != null &&
                                    <div className="mt-4">
                                        <p>Please provide the consent by signing the below agreement to proceed</p>

                                        <div className="mt-3 row align-items-center">
                                            <div className="col"><p>{agreementSigning.data.friendlyName}</p></div>
                                            <div className="col-auto">
                                                <Buttonspotify
                                                    onClick={() => onViewSignAgreementClick()}>
                                                    {translate("View & Sign")}
                                                </Buttonspotify>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                {htmlToReactParser.parse(agreementSigning.data.helpText)}
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    agreementSigning.data === null && <LoadingComponent />
                                }
                            </Fragment>
                        </ModalWithFormWrapper>

                    </Fragment>
                )}
            </Translate>
        );
    }
}



export default JamaicaConsentModal;
