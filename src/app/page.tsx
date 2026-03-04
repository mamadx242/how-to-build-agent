import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold">How To Build Agent</h1>
      <p className="max-w-2xl text-sm text-fd-muted-foreground sm:text-base">
        请选择文档语言，或直接进入英文文档。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/zh/docs"
          className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent/40"
        >
          中文文档
        </Link>
        <Link
          href="/en/docs"
          className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent/40"
        >
          English Docs
        </Link>
      </div>
    </main>
  );
}
