type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageShell({ title, subtitle, children }: Props) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <h1 className="page-title">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
      </section>

      <main className="container page-content">{children}</main>
    </>
  );
}
