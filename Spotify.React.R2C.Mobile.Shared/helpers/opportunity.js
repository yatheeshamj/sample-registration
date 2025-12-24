import {OpportunityType} from "./../constants"
export const getOpportunityPreferenceMatchIndicatorMsgHelper = (qaScore) => {
    let msg = "No Pref Match";

    if (qaScore === 5) {
        msg = "Best Fit for You";
    } else if (qaScore >= 3) {
        msg = "Great Fit For You";
    } else if (qaScore >= 1) {
        msg = "Good Fit For You";
    }

    return msg
}

const EqualsHelper = (a, b) => a === b;
const NotEqualsHelper = (a, b) => a !== b;


// This will return any matches for the Statues passed in for a given opportunity
export const StatusFilterHelper = (StatusArray, opportunity) => {


    let exceptions = StatusArray.filter(x => x.Exception === true);
    let Statues = StatusArray.filter(x => !x.Exception);

    if (exceptions.length > 0) {
        // if this opportunity has any of these "Exceptions" then return blank array
        //
        let exceptionsMet = exceptions.filter(x => {
            return EqualsHelper(x.Status, opportunity.enrollmentStatus) && EqualsHelper(x.StatusReason, opportunity.enrollmentStatusReason);
        });
        if (exceptionsMet.length > 0) return [];
    }

    return Statues
        .filter(x => {
            
            let OperationFunc = EqualsHelper;
            let statusMatch = OperationFunc(x.Status, opportunity.enrollmentStatus);
            if (x.StatusReason === "*") return statusMatch;
            else
               return statusMatch && OperationFunc(x.StatusReason, opportunity.enrollmentStatusReason);
        })
}
//Check for Opp type --New learner,SkillEnhancement,CrossCertification
export const CheckIfOppType=(type)=>{
    if(type==OpportunityType.NewLearner || type==OpportunityType.SkillEnhancement || type==OpportunityType==OpportunityType.CrossCertification){
        return true
    }
    return false
}
