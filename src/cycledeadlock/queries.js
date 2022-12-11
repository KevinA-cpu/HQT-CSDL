const insertDoiTac =
  "INSERT INTO DoiTac VALUES (N'Nguyễn Văn Khánh', N'173 Hoàng Hữu Nam, quận 9, thành phố Hồ Chí Minh', '068202830525', '0172874291', 'khanhnguyen@gmail.com', 1, N'Hồ Chí Minh', '7', '', 300, 'Hủ tíu', '2438471572', N'Hủ tíu Nguyễn Khánh2', N'173 Hoàng Hữu Nam2, quận 9, thành phố Hồ Chí Minh')";
const insertHopDong =
  "INSERT INTO HopDong VALUES ('11124', 1, N'173 Hoàng Hữu Nam, quận 9, thành phố Hồ Chí Minh', '068202830525','MBBank', N'Quận 9')";
const selectHopDong =
  "SELECT MaSoThue, DiaChiDangKyCacChiNhanh FROM HopDong WHERE MaSoThue = '11114'";
const selectDoiTac =
  "SELECT SDT, Email FROM DoiTac WHERE TenNguoiDaiDien = N'Nguyễn Văn Khánh'";
const delay = "WAITFOR DELAY '00:00:05'";

export default {
  insertDoiTac,
  insertHopDong,
  selectHopDong,
  selectDoiTac,
  delay,
};
