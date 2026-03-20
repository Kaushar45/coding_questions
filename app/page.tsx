import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl">
        Hello
        <Link href="/Home">Home Page </Link>
      </h1>
    </div>
  );
}
