import useSWR from "swr";
import { fetcher } from "@/constants/swr";
const Page = ({ pageIndex, length }) => {
  const { data, error } = useSWR(
    `https://dev.vieroot.webc.in/public/api/blog/list?page=${pageIndex}&length=${length}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const allData = data?.data?.original?.data;
  const hasMore = allData && allData.length > 0;

  return (
    
    <>
      {error && <p>{error.message}</p>}
      {hasMore ? (
        allData.map((data) => {
          return (
            <div key={data.id}>
              <h2>{data.title}</h2>
            </div>
          );
        })
      ) : (
        <p>Data over</p>
      )}
      
    </>
  );
};
export default Page;
