import { dinhDangGia } from '../utils/dinhDang.js';

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  return (
    <article
      className={`the${dangChon ? ' dang-chon' : ''}`}
      onClick={() => onChon(mon.id)}
    >
      <h3>{mon.ten}</h3>
      {mon.daHet && <span className="het-mon">Hết món</span>}
      <p>{mon.moTa}</p>
      <p className="gia">{dinhDangGia(mon.gia)}</p>
      <button
        disabled={mon.daHet}
        onClick={(e) => {
          e.stopPropagation();
          onDat(mon.id);
        }}
      >
        Đặt món
      </button>
    </article>
  );
}
