import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      className="
  fixed
  left-0
  top-0
  h-screen
  w-64
  bg-slate-900
  text-white
  border-r
  border-slate-800
  z-50
  "
    >
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          TENGDA OS
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          HVAC Management
        </p>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        <Link
          href="/"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          href="/seo"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          SEO
        </Link>

        <Link
          href="/videos"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Videos
        </Link>

        <Link
          href="/tasks"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Công Việc
        </Link>

        <Link
          href="/ideas"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Ý tưởng
        </Link>
        <Link
          href="/growth"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Tăng Trưởng
        </Link>
      </nav>
    </aside>
  );
}