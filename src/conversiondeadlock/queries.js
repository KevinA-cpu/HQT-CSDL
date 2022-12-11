const getSoNamHoatDong = 
"SELECT SoNamHoatDong FROM ChiTietHopDong WHERE TenQuan = N'Ẩm thực xứ Huế' AND MaSoThue = '11111' AND DiaChiKinhDoanh=N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh'"

const getSoNamHoatDong1 = 
"SELECT SoNamHoatDong FROM ChiTietHopDong with(UPDLOCK) WHERE TenQuan = N'Ẩm thực xứ Huế' AND MaSoThue = '11111' AND DiaChiKinhDoanh=N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh'"

const updateSoNamHoatDong = "UPDATE ChiTietHopDong SET SoNamHoatDong = 3 WHERE TenQuan = N'Ẩm thực xứ Huế' AND MaSoThue = '11111' AND DiaChiKinhDoanh = N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh'"

const delay = "WAITFOR DELAY '00:00:07'";

export default {
    getSoNamHoatDong,
    getSoNamHoatDong1,
    updateSoNamHoatDong,
    delay,
};