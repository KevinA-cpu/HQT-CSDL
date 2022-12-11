const getDonDatHang = "SELECT * FROM DonDatHang where MaDH = N'123'"
const updateDongia = "UPDATE MonAn SET DonGia = 70000 where TenMon = N'Cơm cuộn Kimbap'"
const updateTongTien = "UPDATE DonDatHang SET TongTien = 140000 where MaDH = '123'"
const delay = "WAITFOR DELAY '00:00:03'";
export default {
    getDonDatHang,
    updateDongia,
    updateTongTien,
    delay
};
