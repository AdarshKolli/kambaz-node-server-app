export default function QuizzesDao(db) {
  // Quizzes CRUD
  function findQuizzesForCourse(courseId) {
    return db.quizzes.filter((quiz) => quiz.course === courseId);
  }

  function createQuiz(quiz) {
    const newQuiz = { 
      ...quiz, 
      _id: new Date().getTime().toString(),
      published: false 
    };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  }

  function deleteQuiz(quizId) {
    db.quizzes = db.quizzes.filter((quiz) => quiz._id !== quizId);
    // Also delete associated questions
    db.questions = db.questions.filter((q) => q.quiz !== quizId);
    // Also delete associated attempts
    db.quizAttempts = db.quizAttempts.filter((a) => a.quiz !== quizId);
  }

  function updateQuiz(quizId, quizUpdates) {
    const quiz = db.quizzes.find((quiz) => quiz._id === quizId);
    Object.assign(quiz, quizUpdates);
    return quiz;
  }

  function findQuizById(quizId) {
    return db.quizzes.find((quiz) => quiz._id === quizId);
  }

  function publishQuiz(quizId) {
    const quiz = db.quizzes.find((quiz) => quiz._id === quizId);
    quiz.published = !quiz.published;
    return quiz;
  }

  // Questions CRUD
  function findQuestionsForQuiz(quizId) {
    return db.questions.filter((q) => q.quiz === quizId);
  }

  function createQuestion(question) {
    const newQuestion = { 
      ...question, 
      _id: new Date().getTime().toString() 
    };
    db.questions = [...db.questions, newQuestion];
    return newQuestion;
  }

  function deleteQuestion(questionId) {
    db.questions = db.questions.filter((q) => q._id !== questionId);
  }

  function updateQuestion(questionId, questionUpdates) {
    const question = db.questions.find((q) => q._id === questionId);
    Object.assign(question, questionUpdates);
    return question;
  }

  // Quiz Attempts
  function findAttemptsForQuiz(quizId, userId) {
    return db.quizAttempts.filter(
      (attempt) => attempt.quiz === quizId && attempt.user === userId
    );
  }

  function createAttempt(attempt) {
    const newAttempt = {
      ...attempt,
      _id: new Date().getTime().toString(),
      submittedAt: new Date().toISOString(),
    };
    db.quizAttempts = [...db.quizAttempts, newAttempt];
    return newAttempt;
  }

  function findLatestAttempt(quizId, userId) {
    const attempts = db.quizAttempts.filter(
      (attempt) => attempt.quiz === quizId && attempt.user === userId
    );
    return attempts.sort((a, b) => b.attempt - a.attempt)[0];
  }

  return {
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    findQuizById,
    publishQuiz,
    findQuestionsForQuiz,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    findAttemptsForQuiz,
    createAttempt,
    findLatestAttempt,
  };
}