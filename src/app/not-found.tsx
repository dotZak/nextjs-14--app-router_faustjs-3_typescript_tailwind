import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <header>
        <h1>Not Found</h1>
      </header>
      <main>
        <p>Could not find requested resource</p>
      </main>
      <aside>
        <Link href="/">Return Home</Link>
      </aside>
    </div>
  );
}
