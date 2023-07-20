import "@styles/globals.css";
import React from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/nextjs-router";
import { dataProvider } from "@refinedev/supabase";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import { ColorModeContextProvider } from "@contexts";
import { Header } from "@components/header";
import { StyledEngineProvider } from "@mui/material/styles";
import ModalProvider from "@components/modals/ModalProvider";
import GXProvider from "@dilane3/gx";
import { store } from "src/gx/store";
import LoadLayout from "@components/layout/LoadLayout";
import { ToastContainer } from "react-toastify";
import NextNprogress from "nextjs-progressbar";
import { Colors } from "src/constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    return (
      <>
        <NextNprogress
          color={Colors.primary}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ easing: "ease", speed: 500 }}
        />
        <Component {...pageProps} />
      </>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <RefineKbarProvider>
        {/* <ColorModeContextProvider> */}
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            resources={
              [
                {
                  name: "forms",
                  list: "/forms",
                  show: "/forms/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]
            }
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <GXProvider store={store}>
              <LoadLayout>
                {renderComponent()}
                <ModalProvider />

                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                />
              </LoadLayout>
            </GXProvider>

            <UnsavedChangesNotifier />
            <RefineKbar />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
