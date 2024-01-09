import { redirect } from "next/navigation";
import Link from "next/link";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="container flex flex-row mx-auto h-16 items-center">
        <Link className="text-4xl font-bold" href="/">
          Film<span className="text-yellow-400">Boxx</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
