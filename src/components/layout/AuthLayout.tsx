import Head from "next/head";
import Main from "./Main";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Robustform</title>
        <meta name="description" content={description} />
      </Head>

      <Main>{children}</Main>
    </>
  );
}
