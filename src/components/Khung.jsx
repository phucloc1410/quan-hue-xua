export default function Khung({ tieuDe, hanhDong, children }) {
  return (
    <section className="khung">
      <div className="khung-dau">
        <h2>{tieuDe}</h2>
        {hanhDong}
      </div>
      {children}
    </section>
  );
}
