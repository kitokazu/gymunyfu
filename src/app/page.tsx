import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/home");
  }

  return (
    <div className="h-full">
      <main className="w-full px-4 py-6">
        <div>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        </div>
        <div>
          Go to <a href="/home">Home</a>
        </div>
      </main>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (session) {
//     return {
//       redirect: {
//         destination: "/home",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
