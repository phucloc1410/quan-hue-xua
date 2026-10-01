import { useMemo } from 'react';
import { dinhDangGia } from '../utils/dinhDang.js';

export default function GioHang({ gio, dsMon }) {
  const cacDong = gio.map(({ id, soLuong }) => {
    const mon = dsMon.find((m) => m.id === id);
    return { id, ten: mon.ten, soLuong, thanhTien: mon.gia * soLuong };
  });

  const tongTien = useMemo(() => {
    return cacDong.reduce((tong, d) => tong + d.thanhTien, 0);
  }, [gio, dsMon]);

  return (
    <div data-testid="gio-hang">
      {gio.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul>
            {cacDong.map((d) => (
              <li key={d.id}>
                {d.ten} × {d.soLuong} — {dinhDangGia(d.thanhTien)}
              </li>
            ))}
          </ul>
          <p>
            Tổng tiền: <strong data-testid="tong-tien">{dinhDangGia(tongTien)}</strong>
          </p>
        </>
      )}
    </div>
  );
}
