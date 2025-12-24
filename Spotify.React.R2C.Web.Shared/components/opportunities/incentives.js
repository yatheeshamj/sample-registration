import "./Card/card.scss"
import React, { Fragment } from 'react';
import { Translate } from '../../localize';


function DisplayIncentive({ hasIncentives, Incentives }) {

    if (hasIncentives == 'undefined')
return <span className="HasIncentive important-text" style={{"maxWidth":"fit-content"}}>&nbsp;</span>;
    if (hasIncentives === true)
        return (<div className="HasIncentive important-text" style={{"maxWidth":"fit-content"}}>+ {Incentives} </div>);
    return <span className="HasIncentive important-text" style={{"maxWidth":"fit-content"}}>&nbsp;</span>;
}

const Incentives = ({
    hasIncentives
}) =>
    <Translate>
        {({ translate }) => <Fragment>
            <DisplayIncentive hasIncentives={hasIncentives} Incentives={translate('Incentives!')} />
        </Fragment>
        }

    </Translate>;




export default Incentives;

