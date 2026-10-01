import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import DanhSachMon from './components/DanhSachMon.jsx';
import GioHang from './components/GioHang.jsx';
import FormDatMon from './components/FormDatMon.jsx';
import Khung from './components/Khung.jsx';
import { DS_MON_AN } from './data/monAn.js';
import useLocalStorage from './hooks/useLocalStorage.js';

export default function App() {
  const [gio, setGio] = useLocalStorage('gio-hang', []);
  const [idDangChon, setIdDangChon] = useState(null);
  const [thongBao, setThongBao] = useState('');
  const [formKey, setFormKey] = useState(0);

  const tongPhan = gio.reduce((tong, item) => tong + item.soLuong, 0);

  const tenQuan = import.meta.env.VITE_TEN_QUAN;
  useEffect(() => {
    document.title = tongPhan > 0 ? `(${tongPhan}) ${tenQuan}` : tenQuan;
  }, [tongPhan, tenQuan]);

  function datMon(id) {
    setGio((truoc) => {
      const viTri = truoc.findIndex((item) => item.id === id);
      if (viTri === -1) {
        return [...truoc, { id, soLuong: 1 }];
      }
      return truoc.map((item, i) =>
        i === viTri ? { ...item, soLuong: item.soLuong + 1 } : item
      );
    });
  }

  function guiDon(thongTin) {
    setThongBao(`Đã nhận đơn của ${thongTin.hoTen}`);
    setGio([]);
    setFormKey((k) => k + 1);
  }

  return (
    <>
      <Header tongPhan={tongPhan} />
      <main>
        <Khung tieuDe="Thực đơn">
          <DanhSachMon
            dsMon={DS_MON_AN}
            idDangChon={idDangChon}
            onChon={setIdDangChon}
            onDat={datMon}
          />
        </Khung>

        <Khung
          tieuDe="Giỏ hàng"
          hanhDong={<button onClick={() => setGio([])}>Xóa giỏ hàng</button>}
        >
          <GioHang gio={gio} dsMon={DS_MON_AN} />
        </Khung>

        <Khung tieuDe="Thông tin nhận món">
          <FormDatMon key={formKey} onGui={guiDon} choPhepGui={gio.length > 0} />
          {thongBao && <p role="status" className="thong-bao">{thongBao}</p>}
        </Khung>
      </main>
    </>
  );
}
