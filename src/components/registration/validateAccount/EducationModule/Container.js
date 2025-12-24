import React, { useEffect } from "react";

import { logoutRedirect } from "../../../../actions/loginActions";
import { connect } from "react-redux";
import { EducationModule } from "./EducationModule";
import {
  fetchQuestions,
  skipModule,
  SubmitAnswers,
} from "spotify-shared/actions/educationModule";
import { getAdmissionStepInstances } from "../../../../actions/admissionStepActions";

const EducationView = (props) => {
  
  useEffect(() => {
    props.fetchQuestions();
  }, []);

  const fetchCorrectAnswers = async () => {
    const answers = await Promise.all(
      props.educationModule.questions.map(async (q) => {
        let ans = "";
        const ansValue = q.answerOptions.split("\n");

        // Decrypt the correct answer before looping
        let correctA = await decryptAES(q.correctAnswers);

        for (const element of ansValue) {
          let [k, v] = element.split(/[.\]]+/);
          if (k.trim() === correctA.trim()) {
            ans = v.trim();
            break; // Exit loop once correct answer is found
          }
        }
        return { [q.questionName]: ans };
      })
    );

    const ansObj = Object.assign({}, ...answers);
    return ansObj;
  };

  async function decryptAES(encryptedBase64) {

    // Correct IV (from C# InitializationVector)
    const ivArray = new Uint8Array([
      162, 244, 37, 135, 24, 63, 34, 247, 57, 183, 218, 183, 210, 234, 240, 91,
    ]);

    // Correct Key (Base64 decoded)
    function base64ToUint8Array(base64) {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }

    const keyBuffer = base64ToUint8Array(
      "WJp+Jpgf/MUBMnsakY1Hst6ADkO55cabrKoBInpOCcs="
    ); // AES Key (Base64 Decoded)
    const encryptedData = base64ToUint8Array(encryptedBase64); // Encrypted Base64 data

    try {
      // Import AES key
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      // Decrypt data
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: ivArray },
        cryptoKey,
        encryptedData
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }

  return (
    <div>
      <EducationModule
        agentProfile={props.agentProfile}
        educationModule={props.educationModule}
        SubmitAnswers={props.SubmitAnswers}
        getAdmissionStepInstances={props.getAdmissionStepInstances}
        outstandingTask={props.outstandingTask}
        fetchCorrectAnswers={fetchCorrectAnswers}
        skipModule={props.skipModule}
      />
    </div>
  );
};

//export default MainLayoutFullNavAuthenticated(AssessmentView)
function mapStateToProps({ educationModule, agentProfile }) {
  return {
    educationModule,
    agentProfile,
  };
}

const mapDispatchToProps = {
  logoutRedirect,
  fetchQuestions,
  SubmitAnswers,
  skipModule,
  getAdmissionStepInstances,
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationView);
