import { useActions, useSignal } from "@dilane3/gx";
import React from "react";
import userProvider from "src/api/users";
import { authProvider } from "src/authProvider";
import User from "src/entities/user/User";
import { AuthState } from "src/gx/signals/auth";

export default function useAuth() {
  const { getIdentity } = authProvider;

  // Global state
  const { loading } = useSignal<AuthState>("auth");

  // Global actions
  const { login } = useActions("auth");

  // Effects
  React.useEffect(() => {
    const getCurrentUser = async () => {
      if (!getIdentity) return;

      const userData = (await getIdentity()) as any;

      if (userData) {
        await handleCreateUserIfNotRegistered(userData);

        // Get the user data
        const { data } = await userProvider.getUser({
          uid: userData.id,
        });

        if (data && data.length > 0) {
          const user = new User(data[0]);

          login(user);
        }
      }
    };

    if (loading === false) return;

    getCurrentUser();
  }, [loading]);

  // Handlers
  const handleCreateUserIfNotRegistered = async (data: any) => {
    // Check if the user is already registered into the users table
    const {
      success,
      data: userData,
      error: userError,
    } = await userProvider.getUser({
      uid: data.id,
    });

    if (success) {
      if (userData?.length === 0) {
        // User is not registered, so we register it
        const { error, data: userData } = await userProvider.createUser({
          email: data.email,
          uid: data.id,
          created_at: data.created_at,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        } else {
          return {
            success: true,
            data,
          };
        }
      }
    }

    return {
      success: false,
      error: userError,
    };
  };
}
