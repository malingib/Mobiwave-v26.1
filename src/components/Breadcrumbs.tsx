import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-custom pt-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#5b6b78]">
        <li><Link to="/" className="hover:text-[#0084ff] transition-colors">Home</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-[#9aa8b2]" aria-hidden="true" />
            {item.href ? (
              <Link to={item.href} className="hover:text-[#0084ff] transition-colors">{item.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-[#0a1a25]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
