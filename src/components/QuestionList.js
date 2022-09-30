import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions);
      });
  });

  function deleteQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => {
          return q.id !== questionId;
        });
        setQuestions(updatedQuestions);
      });
  }
  function updatedQuestion(question, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        let updatedQuestions = questions.map((quiz) => {
          if (quiz.id === question.id) {
            return newQuestion;
          }
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }

  const qList = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        updatedQuestion={updatedQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList}</ul>
    </section>
  );
}

export default QuestionList;
