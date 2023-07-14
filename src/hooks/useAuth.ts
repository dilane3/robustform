import React from "react";
import { authProvider } from "src/authProvider";

export default function useAuth() {
  const { getIdentity } = authProvider;

  // Effects
  React.useEffect(() => {
    const getCurrentUser = async () => {
      if (!getIdentity) return;

      const response = await getIdentity();

      console.log(response);
    };

    getCurrentUser();
  }, []);
}
