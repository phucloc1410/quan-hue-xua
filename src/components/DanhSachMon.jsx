import MonAnCard from './MonAnCard.jsx';

export default function DanhSachMon({ dsMon, idDangChon, onChon, onDat }) {
  return (
    <div className="luoi-the">
      {dsMon.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={mon.id === idDangChon}
          onChon={onChon}
          onDat={onDat}
        />
      ))}
    </div>
  );
}
