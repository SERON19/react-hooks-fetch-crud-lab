import React from "react";

function QuestionItem({ question, deleteQuestion, updatedQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  function handleDelete(id) {
    deleteQuestion(id);
  }
  function handleChange(newCorrectIndex) {
    updatedQuestion(question, newCorrectIndex);
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
