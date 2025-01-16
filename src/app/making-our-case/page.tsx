import Link from "next/link";
import HttPeteArticle from "./article";

const MakingOurCase = () => {
  return (
    <>
    <div className="container sticky top-4 mx-auto mt-4">
      <Link href="/" className="p-2" style={{textDecoration: 'none'}}> 
        <span  className="text-red-400">← Go Back</span>
    </Link>
    </div>
      <div className="container mx-auto">
        <HttPeteArticle />
      </div>
    </>
  );
};

export default MakingOurCase;