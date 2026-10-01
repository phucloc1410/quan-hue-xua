import { useState, useRef, useEffect } from 'react';

const GIA_TRI_DAU = { hoTen: '', soDienThoai: '', ghiChu: '' };

function kiemTra(truong, giaTri) {
  if (truong === 'hoTen') return giaTri.trim().length >= 2 ? '' : 'Họ tên cần ít nhất 2 ký tự';
  if (truong === 'soDienThoai') {
    return /^0\d{9}$/.test(giaTri.trim()) ? '' : 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0';
  }
  return '';
}

export default function FormDatMon({ onGui, choPhepGui }) {
  const [giaTri, setGiaTri] = useState(GIA_TRI_DAU);
  const [loi, setLoi] = useState({});

  const hoTenRef = useRef(null);
  useEffect(() => {
    hoTenRef.current?.focus();
  }, []);

  function xuLyThayDoi(e) {
    const { name, value } = e.target;
    setGiaTri((truoc) => ({ ...truoc, [name]: value }));
  }

  function xuLyRoiO(e) {
    const { name, value } = e.target;
    const loiMoi = kiemTra(name, value);
    setLoi((truoc) => ({ ...truoc, [name]: loiMoi }));
  }

  function xuLyGui(e) {
    e.preventDefault();
    const loiHoTen = kiemTra('hoTen', giaTri.hoTen);
    const loiSDT = kiemTra('soDienThoai', giaTri.soDienThoai);
    const loiMoi = { hoTen: loiHoTen, soDienThoai: loiSDT };
    setLoi(loiMoi);

    if (loiHoTen || loiSDT) return;

    onGui({
      hoTen: giaTri.hoTen.trim(),
      soDienThoai: giaTri.soDienThoai.trim(),
      ghiChu: giaTri.ghiChu.trim(),
    });
  }

  return (
    <form className="form-dat-mon" noValidate onSubmit={xuLyGui}>
      <label htmlFor="ho-ten">Họ tên</label>
      <input
        id="ho-ten"
        name="hoTen"
        ref={hoTenRef}
        value={giaTri.hoTen}
        onChange={xuLyThayDoi}
        onBlur={xuLyRoiO}
      />
      {loi.hoTen && <p className="loi" role="alert">{loi.hoTen}</p>}

      <label htmlFor="so-dien-thoai">Số điện thoại</label>
      <input
        id="so-dien-thoai"
        name="soDienThoai"
        value={giaTri.soDienThoai}
        onChange={xuLyThayDoi}
        onBlur={xuLyRoiO}
      />
      {loi.soDienThoai && <p className="loi" role="alert">{loi.soDienThoai}</p>}

      <label htmlFor="ghi-chu">Ghi chú</label>
      <textarea
        id="ghi-chu"
        name="ghiChu"
        value={giaTri.ghiChu}
        onChange={xuLyThayDoi}
      />

      <button type="submit" disabled={!choPhepGui}>Gửi đơn</button>
    </form>
  );
}
