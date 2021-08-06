import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
const Header = () => {
  const [session] = useSession();
  return (
    <div
      className="sticky top-0 z-50 flex items-center px-4 py-2
    shadow-md bg-white"
    >
      {/* <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-15 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button> */}
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-2xl hidden md:inline-flex">
        Docs
      </h1>

      <div
        className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 
      bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md
      w-10"
      >
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent flex-grow px-5 text-base outline-none"
        />
      </div>
      <img
        loading="lazy"
        onClick={signOut}
        className="cursor-pointer h-8 w-8 rounded-full ml-2"
        src={session.user.image}
        alt=""
      />
    </div>
  );
};

export default Header;
