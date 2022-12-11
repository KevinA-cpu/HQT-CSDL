CREATE DATABASE GiaoDoAnABC
GO
USE GiaoDoAnABC
GO


--- TẠO BẢNG ---
CREATE TABLE QuanTri
(
	Ten NVARCHAR(30),
	DiaChi NVARCHAR(100),
	CCCD CHAR(12),
	SDT CHAR(10)
)


CREATE TABLE KhachHang
(
	Ten NVARCHAR(30),
	DiaChi NVARCHAR(100),
	CCCD CHAR(12),
	SDT CHAR(10),
	Email VARCHAR(30),
	MaKH VARCHAR(8)

		CONSTRAINT PK_KhachHang PRIMARY KEY (MaKH)
)


CREATE TABLE TaiXe
(
	Ten NVARCHAR(30),
	DiaChi NVARCHAR(100),
	CCCD CHAR(12),
	SDT CHAR(10),
	BienSoXe VARCHAR(15),
	KhuVucHoatDong NVARCHAR(100),
	Email VARCHAR(30),
	STKNganHang VARCHAR(15),
	PhiTheChan MONEY,
	MaTX VARCHAR(8)

		CONSTRAINT PK_TaiXe PRIMARY KEY (MaTX)
)

CREATE TABLE DoiTac
(
	TenNguoiDaiDien NVARCHAR(30),
	DiaChi NVARCHAR(100),
	CCCD CHAR(12),
	SDT CHAR(10),
	Email VARCHAR(30),
	SoLuongChiNhanh INT,
	ThanhPho NVARCHAR(30),
	Quan NVARCHAR(30),
	Huyen NVARCHAR(30),
	SoLuongDonHangNgay INT,
	LoaiThucPham NVARCHAR(50),
	TaiKhoanNganHang VARCHAR(30),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100)

		CONSTRAINT PK_DoiTac PRIMARY KEY (TenQuan, DiaChiKinhDoanh)
)

CREATE TABLE DonDatHang
(
	MaDH VARCHAR(8),
	TongTien MONEY,
	TrangThaiDonHang NVARCHAR(25),
	MaKH VARCHAR(8),
	MaTX VARCHAR(8),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	TenMon NVARCHAR(30),
	SoLuongMon INT

		CONSTRAINT PK_DonDatHang PRIMARY KEY (MaDH)
)

CREATE TABLE HoaHong
(
	MaDH VARCHAR(8),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	TienHoaHong MONEY

		CONSTRAINT PK_HoaHong PRIMARY KEY (MaDH, TenQuan, DiaChiKinhDoanh)
)

CREATE TABLE Feedback
(
	MaKH VARCHAR(8),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	ThongTinFeedback NVARCHAR(500)

		CONSTRAINT PK_Feedback PRIMARY KEY (MaKH, TenQuan, DiaChiKinhDoanh)
)

CREATE TABLE MonAn
(
	TenMon NVARCHAR(30),
	SoLuongDaBan INT,
	LuotLike INT,
	LuotDislike INT,
	DonGia MONEY,
	TinhTrangMon NVARCHAR(25)

		CONSTRAINT PK_MonAn PRIMARY KEY (TenMon)
)

CREATE TABLE TuyChonMonAn
(
	TenMon NVARCHAR(30),
	TuyChon NVARCHAR(500)

		CONSTRAINT PK_TuyChonMonAn PRIMARY KEY (TenMon)
)

CREATE TABLE ThucDon
(
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	MonAn NVARCHAR(30),
	-- !!!
)

CREATE TABLE HopDong
(
	MaSoThue NVARCHAR(13),
	SoChiNhanhDangKy INT,
	DiaChiDangKyCacChiNhanh NVARCHAR(100),
	STKNganHang VARCHAR(15),
	NganHang NVARCHAR(50),
	ChiNhanh NVARCHAR(100)

		CONSTRAINT PK_HopDong PRIMARY KEY (MaSoThue)
)

CREATE TABLE ChiTietHopDong
(
	MaSoThue NVARCHAR(13),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	SoNamHoatDong INT,
	TrangThaiHoatDong NVARCHAR(25),
	NgayKyHopDong DATE,
	PhiHoaHong MONEY

		CONSTRAINT PK_ChiTietHopDong PRIMARY KEY (MaSoThue, TenQuan, DiaChiKinhDoanh)
)

CREATE TABLE PhiKichHoat
(
	MaSoThue NVARCHAR(13),
	TenDoiTac NVARCHAR(30),
	SoTien MONEY

		CONSTRAINT PK_PhiKichHoat PRIMARY KEY (MaSoThue, TenDoiTac, SoTien)
)

CREATE TABLE HeThongOnline
(
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	ThanhPho NVARCHAR(30),
	Quan NVARCHAR(30),
	Huyen NVARCHAR(30),
	TrangThaiHoatDong NVARCHAR(30)

		CONSTRAINT PK_HeThongOnline PRIMARY KEY (TenQuan, DiaChiKinhDoanh)
)





--- TẠO KHÓA NGOẠI ---

-- TABLE DonDatHang -- 
-- DonDatHang(MaKH) -> KhachHang(MaKH)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
-- DonDatHang(MaTX) -> TaiXe(MaTX)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_TaiXe FOREIGN KEY (MaTX) REFERENCES TaiXe(MaTX)
-- DonDatHang(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)
-- DonDatHang(TenMon) -> MonAn(TenMon)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_MonAn FOREIGN KEY (TenMon) REFERENCES MonAn(TenMon)


-- TABLE Feedback -- 
-- Feedback(MaKH) -> KhachHang(MaKH)
ALTER TABLE Feedback
ADD CONSTRAINT FK_Feedback_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
-- Feedback(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE Feedback
ADD CONSTRAINT FK_Feedback_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)


-- TABLE HeThongOnline -- 
-- HeThongOnline(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE HeThongOnline
ADD CONSTRAINT FK_HeThongOnline_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)


-- TABLE ChiTietHopDong -- 
-- ChiTietHopDong(MaSoThue) -> HopDong(MaSoThue)
ALTER TABLE ChiTietHopDong
ADD CONSTRAINT FK_ChiTietHopDong_HopDong FOREIGN KEY (MaSoThue) REFERENCES HopDong(MaSoThue)
-- ChiTietHopDong(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE ChiTietHopDong
ADD CONSTRAINT FK_ChiTietHopDong_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)


-- TABLE HoaHong -- 
-- HoaHong(MaDH) -> DonDatHang(MaDH)
ALTER TABLE HoaHong
ADD CONSTRAINT FK_HoaHong_DonDatHang FOREIGN KEY (MaDH) REFERENCES DonDatHang(MaDH)
-- HoaHong(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE HoaHong
ADD CONSTRAINT FK_HoaHong_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)


-- TABLE TuyChonMonAn -- 
-- TuyChonMonAn(TenMon) -> MonAn(TenMon)
ALTER TABLE TuyChonMonAn
ADD CONSTRAINT FK_TuyChonMonAn_MonAn FOREIGN KEY (TenMon) REFERENCES MonAn(TenMon)


-- TABLE PhiKichHoat -- 
-- PhiKichHoat(MaSoThue) -> HopDong(MaSoThue)
ALTER TABLE PhiKichHoat
ADD CONSTRAINT FK_PhiKichHoat_HopDong FOREIGN KEY (MaSoThue) REFERENCES HopDong(MaSoThue)
-- PhiKichHoat(TenDoiTac) -> DoiTac(TenQuan)
--ALTER TABLE PhiKichHoat
--ADD CONSTRAINT FK_PhiKichHoat_DoiTac FOREIGN KEY (TenDoiTac) REFERENCES DoiTac(TenQuan)


-- TABLE ThucDon -- 
-- ThucDon(TenQuan, DiaChiKinhDoanh) -> DoiTac(TenQuan, DiaChiKinhDoanh)
ALTER TABLE ThucDon
ADD CONSTRAINT FK_ThucDon_DoiTac FOREIGN KEY (TenQuan, DiaChiKinhDoanh) REFERENCES DoiTac(TenQuan, DiaChiKinhDoanh)
-- ThucDon(MonAn) -> MonAn(TenMon)
ALTER TABLE ThucDon
ADD CONSTRAINT FK_ThucDon_MonAn FOREIGN KEY (MonAn) REFERENCES MonAn(TenMon)

-- Table DoiTac -- 
INSERT INTO DoiTac
VALUES(N'Phan Dương Quốc Đạt', N'05 Lý Tự Trọng, quận 1, thành phố Hồ Chí Minh', '068201020526', '0396205226', 'datphan05@gmail.com', 1, N'Hồ Chí Minh', '1', '', 500, N'Đồ ăn Hàn Quốc', '1631591406', N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh')
INSERT INTO DoiTac
VALUES(N'Dương Thanh Hà', N'17 Nguyễn Chí Thanh, quận 3, thành phố Hồ Chí Minh', '035176298423', '0983654265', 'thanhha@gmail.com', 1, N'Hồ Chí Minh', '1', '', 450, N'Đồ ăn Huế', '0468321572', N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh')
INSERT INTO DoiTac
VALUES(N'Hòang Mạnh Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', '068243543517', '0315478632', 'cuongmanh09@gmail.com', 1, N'Hồ Chí Minh', '7', '', 400, N'Đồ ăn vặt', '0365198732', N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh')

-- Table TaiXe --
INSERT INTO TaiXe
VALUES
	(N'Lương Văn Ánh', N'235 Hoàng Hữu Nam, quận 7, thành phố Hồ Chí Minh', '068235419561', '0354126841', '79K11367', N'Quận 7, thành phố Hồ Chí Minh', 'anhluong123@gmail.com', '16587413552', '1500000', 'TX000001')
INSERT INTO TaiXe
VALUES
	(N'Trần Đức Bảo', N'86 Lê Văn Việt, quận Bình Thạnh, thành phố Hồ Chí Minh', '068265413978', '0357545332', '60AA65132', N'Quận 1, thành phố Hồ Chí Minh', 'bao2938@gmail.com', '13461354896', '1500000', 'TX000002')
INSERT INTO TaiXe
VALUES
	(N'Lê Trung Kiên', N'65 Võ Văn Ngân, quận Tân Bình, thành phố Hồ Chí Minh', '068265138473', '0431798654', '60A163219', N'Quận 1, thành phố Hồ Chí Minh', 'trungkien98@gmail.com', '652135847632', '1500000', 'TX000003')

-- Table KhachHang --
INSERT INTO KhachHang
VALUES
	(N'Nguyễn Ngọc Ánh', N'Quận 7, thành phố Hồ Chí Minh', '068232146857', '0785412963', 'anhngoc74@gmail.com', 'KH000001')
INSERT INTO KhachHang
VALUES
	(N'Nguyễn Khắc Dương', N'Quận 9, thành phố Hồ Chí Minh', '068265423873', '0182738264', 'khacduong36@gmail.com', 'KH000002')
INSERT INTO KhachHang
VALUES
	(N'Trần Thanh Sang', N'Quận 3, thành phố Hồ Chí Minh', '068248392019', '0382947162', 'thanhsang73@gmail.com', 'KH000003')

-- Table MonAn --
INSERT INTO MonAn
VALUES
	(N'Cơm cuộn Kimbap', 5265, 4632, 261, '60000', N'có bán')
INSERT INTO MonAn
VALUES
	(N'Cơm hến', 6543, 3651, 167, '55000', N'có bán')
INSERT INTO MonAn
VALUES
	(N'Bánh tráng trộn', 3651, 1653, 132, '30000', N'có bán')

-- Table TuyChonMonAn --
INSERT INTO TuyChonMonAn
VALUES
	(N'Cơm cuộn Kimbap', N'Ít cơm, thêm cà rốt, giá và 1 trứng ốp la')
INSERT INTO TuyChonMonAn
VALUES
	(N'Cơm hến', N'Nhiều hến ít cơm, double đậu phộng')
INSERT INTO TuyChonMonAn
VALUES
	(N'Bánh tráng trộn', N'Bánh tráng bóp mềm, thêm hành phi và 3 trứng cút')

-- Table HopDong --
INSERT INTO HopDong
VALUES
	('11111', 1, N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', '1631591406', N'Vietcombank', N'Quận 1')
INSERT INTO HopDong
VALUES
	('11112', 1, N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', '0468321572', N'Vietcombank', N'Quận 1')
INSERT INTO HopDong
VALUES
	('11113', 1, N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', '0365198732', N'ACB', N'Quận 7')

delete from HopDong where MaSoThue = N'123456'
ALTER TABLE HopDong
alter column NganHang nvarchar(25);

--Table ChiTietHopDong --
INSERT INTO ChiTietHopDong
VALUES
	('11111', N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', 1, N'Hoạt động', '10-10-2020', 300000)
INSERT INTO ChiTietHopDong
VALUES
	('11112', N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', 2, N'Hoạt động', '11-10-2021', 400000)
INSERT INTO ChiTietHopDong
VALUES
	('11113', N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', 3, N'Hoạt động', '12-10-2022', 500000)

-- Table DonDatHang --
INSERT INTO DonDatHang
VALUES
	('123', 120000, N'Chờ nhận', 'KH000001', 'TX000001', N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Cơm cuộn Kimbap', 2)
INSERT INTO DonDatHang
VALUES
	('124', 55000, N'Chờ nhận', 'KH000002', 'TX000002', N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Cơm hến', 1)
INSERT INTO DonDatHang
VALUES
	('125', 90000, N'Chờ nhận', 'KH000003', 'TX000003', N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', N'Bánh tráng trộn', 3)

--Table Feedback --
INSERT INTO Feedback
VALUES
	('KH000001', N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Ngon và rẻ')
INSERT INTO Feedback
VALUES
	('KH000003', N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Ổn với giá tiền')
INSERT INTO Feedback
VALUES
	('KH000003', N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', N'Đồ ăn nguội')

--Table PhiKichHoat --
INSERT INTO PhiKichHoat
VALUES
	('11111', N'Dat Phan Tastique', 1000000)
INSERT INTO PhiKichHoat
VALUES
	('11112', N'Ẩm thực xứ Huế', 1000000)
INSERT INTO PhiKichHoat
VALUES
	('11113', N'Bếp của Cường', 1000000)

--Table HoaHong --
INSERT INTO HoaHong
VALUES
	('123', N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', 300000)
INSERT INTO HoaHong
VALUES
	('124', N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', 400000)
INSERT INTO HoaHong
VALUES
	('125', N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', 500000)

insert into QuanTri
values
	(N'Nguyễn Văn A', N'Thành phố Hồ Chí Minh', '236514598763', '0356874215')

-- Table ThucDon --
INSERT INTO ThucDon
VALUES
	(N'Dat Phan Tastique', N'26 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Cơm cuộn Kimbap')
INSERT INTO ThucDon
VALUES
	(N'Ẩm thực xứ Huế', N'28 Hàm Nghi, quận 1, thành phố Hồ Chí Minh', N'Cơm hến')
INSERT INTO ThucDon
VALUES
	(N'Bếp của Cường', N'26 Lê Lợi, quận 7, thành phố Hồ Chí Minh', N'Bánh tráng trộn')

