export const FilterOptionQuestionDelimiter = "-_-";

export const getFilterOptionQuestionResponseKey = (option, response) =>
    `${option.label}${FilterOptionQuestionDelimiter}${response.value}${FilterOptionQuestionDelimiter}${response.key}`;
