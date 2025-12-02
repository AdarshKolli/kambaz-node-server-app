import model from "./model.js";

export default function EnrollmentsDao(db) {
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const enrollUserInCourse = (userId, courseId) => {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  };

  const unenrollUserFromCourse = (user, course) => {
    return model.deleteOne({ user, course });
  };

  const unenrollAllUsersFromCourse = (courseId) => {
    return model.deleteMany({ course: courseId });
  };

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}