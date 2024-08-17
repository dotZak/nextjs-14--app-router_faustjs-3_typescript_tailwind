import Link from "next/link";

export const MastHead = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <Link href="/">{title}</Link>
      <p>{description}</p>
    </div>
  );
};

export default MastHead;
