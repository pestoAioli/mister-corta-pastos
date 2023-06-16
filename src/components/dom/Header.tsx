import Head from "next/head";


type HeaderProps = {
  title?: string;
  /**
   * Relative URL to cover image.
   * Should be inside `/public/` folder.
   */
  coverImage?: string;
};

const Header = ({ title, coverImage }: HeaderProps) => {
  title = "Ricky wuz here 🤓"
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default Header;
