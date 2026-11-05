export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-5">
        <h2 className="text-xl font-semibold whitespace-nowrap">
          {title}
        </h2>

        <div className="flex-1 max-w-full h-px bg-zinc-900" />
      </div>

      <div className="pl-2">
        {children}
      </div>
    </section>
  );
}