import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  // Get all quizzes for a course
  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  // Get single quiz
  app.get("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    res.json(quiz);
  });

  // Create quiz
  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = dao.createQuiz(quiz);
    res.json(newQuiz);
  });

  // Update quiz
  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const status = dao.updateQuiz(quizId, req.body);
    res.json(status);
  });

  // Delete quiz
  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(200);
  });

  // Publish/Unpublish quiz
  app.put("/api/quizzes/:quizId/publish", (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.publishQuiz(quizId);
    res.json(quiz);
  });

  // Get questions for quiz
  app.get("/api/quizzes/:quizId/questions", (req, res) => {
    const { quizId } = req.params;
    const questions = dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // Create question
  app.post("/api/quizzes/:quizId/questions", (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion = dao.createQuestion(question);
    res.json(newQuestion);
  });

  // Update question
  app.put("/api/questions/:questionId", (req, res) => {
    const { questionId } = req.params;
    const status = dao.updateQuestion(questionId, req.body);
    res.json(status);
  });

  // Delete question
  app.delete("/api/questions/:questionId", (req, res) => {
    const { questionId } = req.params;
    dao.deleteQuestion(questionId);
    res.sendStatus(200);
  });

  // Get attempts for quiz
  app.get("/api/quizzes/:quizId/attempts", (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempts = dao.findAttemptsForQuiz(quizId, currentUser._id);
    res.json(attempts);
  });

  // Submit quiz attempt
  app.post("/api/quizzes/:quizId/attempts", (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = {
      ...req.body,
      quiz: quizId,
      user: currentUser._id,
    };
    const newAttempt = dao.createAttempt(attempt);
    res.json(newAttempt);
  });

  // Get latest attempt
  app.get("/api/quizzes/:quizId/attempts/latest", (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = dao.findLatestAttempt(quizId, currentUser._id);
    res.json(attempt);
  });
}