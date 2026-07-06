import Link from "next/link";

export function PageContainer({
  eyebrow,
  title,
  intro,
  breadcrumb,
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="hero-ambient pointer-events-none absolute inset-x-0 top-0 h-52 -z-10" />
      <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-7 sm:px-6 lg:px-10">
        {breadcrumb && (
          <nav className="mb-4 flex items-center gap-1.5 text-[13px]">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-muted/60">›</span>}
                {b.href ? (
                  <Link href={b.href} className="font-medium text-purple hover:text-purple-deep">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-muted">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && <div className="label-caps mb-2 text-purple">{eyebrow}</div>}
            <h1 className="text-[30px] font-bold leading-tight tracking-tight text-graphite lg:text-[34px]">
              {title}
            </h1>
            {intro && <p className="mt-3 text-[15px] leading-relaxed text-muted">{intro}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
