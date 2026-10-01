export default function Header({ tongPhan }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN;

  return (
    <header className="thanh-tieu-de">
      <h1>{tenQuan}</h1>
      <span>
        Giỏ:
        <span className="huy-hieu" data-testid="tong-phan">{tongPhan}</span>
        phần
      </span>
    </header>
  );
}
