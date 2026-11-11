interface SectionHeadingProps {
  label: string;
  title: string;
  highlight: string;
}

export default function SectionHeading({
  label,
  title,
  highlight,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      {label && (
        <>
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[rgb(255,102,139)] dark:text-[rgb(215,84,88)]">
            {label}
          </span>
          <br />
        </>
      )}

      <h2 className="relative isolate mt-0.5 inline-block text-4xl font-bold text-[rgb(116,28,33)] before:absolute before:inset-x-1/12 before:bottom-1.5 before:z-0 before:h-2.5 before:rounded-full before:bg-[rgb(255,102,139)]/25 before:content-[''] decoration-[rgb(255,102,139)] dark:text-[rgb(255,194,208)]">
        <span className="underline decoration-[rgb(230,80,115)] dark:decoration-[rgb(255,102,139)]">
          {title}
        </span>{" "}
        {highlight}
      </h2>
    </div>
  );
}
