const insertFeedback =
  "INSERT INTO Feedback VALUES ('001','Ten quan','Dia chi', 'Mon an','Danh gia')";
const getFeedback = "SELECT COUNT(*) FROM Feedback";
const delay = "WAITFOR DELAY '00:00:05'";
export default {
  insertFeedback,
  getFeedback,
  delay,
};
