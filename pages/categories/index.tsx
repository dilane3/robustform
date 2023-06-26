import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";



export default function CategoryList() {
    return <MuiListInferencer 
    />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {


    const { authenticated, redirectTo } = await authProvider.check(context);



    if (!authenticated) {
        return {
            props: {
            },
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent(
          "/categories"
        )}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
        },
    };
};
