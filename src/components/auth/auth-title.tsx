type AuthTitleProps = { title: string };

export function AuthTitle({ title }: AuthTitleProps) {
  return (
    <header className="border-soft flex w-full flex-col items-center gap-4 border-b pb-4">
      <h1 className="font-script text-primary text-4xl rtl:font-sans">
        {title}
      </h1>{" "}
    </header>
  );
}
