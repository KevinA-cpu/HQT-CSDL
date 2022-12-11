const setLuotLike = "SELECT LuotLike FROM MonAn WHERE TenMon = N'Cơm hến'";
const setLuotLike_XLock =
  "SELECT LuotLike FROM MonAn with (xlock) WHERE TenMon = N'Cơm hến'";
const delay = "WAITFOR DELAY '00:00:03'";
const queryComHen = "SELECT * FROM MonAn WHERE TenMon = N'Cơm hến'";

export default {
  setLuotLike,
  setLuotLike_XLock,
  delay,
  queryComHen,
};
