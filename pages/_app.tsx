import "@styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";
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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2 Header={() => <Header sticky />}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(supabaseClient)}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              resources={[
                {
                  name: "forms",
                  list: "/forms",
                  show: "/forms/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <GXProvider store={store}>
                <>
                  {renderComponent()}
                  <ModalProvider />
                </>
              </GXProvider>

              <UnsavedChangesNotifier />
              <RefineKbar />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
