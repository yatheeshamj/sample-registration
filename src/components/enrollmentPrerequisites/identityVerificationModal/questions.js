import React, { Fragment, Component } from 'react';

import { Field } from "formik";

import "./index.scss"
import { Radio } from '@material-ui/core';
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"



class QuestionResults extends Component {
	render() {
		const { question, key, formProps } = this.props;

		return (
			<div className="experianQuestions">
				<div className="messages pcMessages" id="{key}">
					<div className="messages-header">
						<Field
							name={"question_" + key}
							label={question.questionText}
							options={
								question.choices.map((choice, key2) => {
									return { value: choice.item1, label: choice.item2 }
								})
							}
							id={"question_" + key}
							component={RadioButton}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default QuestionResults;
