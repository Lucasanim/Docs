import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

const DocumentRow = ({ id, fileName, date }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center p-4 pl-0 rounded-lg hover:bg-gray-100
    cursor-pointer text-sm text-gray-700"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        buttonType="outline"
        rounded
        iconOnly
        ripple="dark"
        className="border-0 pl-7"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  );
};

export default DocumentRow;
