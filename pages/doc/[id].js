import Icon from "@material-tailwind/react/Icon";
import Head from "next/dist/next-server/lib/head";
import { getSession, useSession } from "next-auth/client";
import Login from "../../components/login";
import { db } from "../../firebase";

import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";

import TextEditor from "../../components/text-editor";

const Doc = () => {
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  if (!session) return <Login />;
  if (!loadingSnapshot && !snapshot.data()?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <Head>
        <title>{snapshot?.data()?.fileName || Docs}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="arrow_left" size="5xl" color="blue" />
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          <h2 className="">{snapshot?.data()?.fileName}</h2>
          {/* <div className="flex items-center text-sm space-x-1 ml-1 h-8 text-gray-600">
            <p className="cursor-pointer hover:bg-gray-100">File</p>
            <p className="cursor-pointer hover:bg-gray-100">Edit</p>
            <p className="cursor-pointer hover:bg-gray-100">View</p>
            <p className="cursor-pointer hover:bg-gray-100">Insert</p>
            <p className="cursor-pointer hover:bg-gray-100">Format</p>
            <p className="cursor-pointer hover:bg-gray-100">Tools</p>
          </div> */}
        </div>

        <img
          loading="lazy"
          //   onClick={signOut}
          className="cursor-pointer h-12 w-12 rounded-full ml-2"
          src={session?.user?.image}
          // src={sessionStorage.user.image}
          alt=""
        />
      </header>
      <TextEditor />
    </div>
  );
};

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
