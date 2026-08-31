import { navItems } from "@/components/layout/nav-items";
import { APP_NAME } from "@/lib/config";

export function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-line sm:w-56 sm:border-r">
      <div className="px-5 py-6">
        <span className="font-display text-lg italic text-ink">{APP_NAME}</span>
      </div>

      <nav aria-label="Main" className="px-3">
        <ul className="flex flex-row gap-1 sm:flex-col">
          {navItems.map((item) => (
            <li key={item.href} className="flex-1 sm:flex-none">
              {item.available ? (
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              ) : (
                <span className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted">
                  {item.label}
                  <span className="ml-2 hidden text-xs sm:inline">Soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
