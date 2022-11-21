const insertDoiTac =
  "INSERT INTO DoiTac VALUES('Nguyen Van A', 'Test', 'Test', 'Test', 'Test', 1, 'Test', 'Test', 'Test', 5, 'Test', 'Test', 'Lau De A', 'XYZ')";
const getDoiTac = "SELECT * FROM DoiTac WHERE TenNguoiDaiDien = 'Nguyen Van A'";
const delay = "WAITFOR DELAY '00:00:05'";
export default {
  insertDoiTac,
  getDoiTac,
  delay,
};
