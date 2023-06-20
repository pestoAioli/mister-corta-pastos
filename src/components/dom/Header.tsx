import Head from "next/head";


type HeaderProps = {
  title?: string;
  /**
   * Relative URL to cover image.
   * Should be inside `/public/` folder.
   */
  coverImage?: string;
};

const Header = ({ title }: HeaderProps) => {
  title = "Ricky's Portfolio🤓"
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default Header;
