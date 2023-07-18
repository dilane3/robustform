import { supabaseClient } from "../../utility";

const userProvider = {
  createUser: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient.from("users").insert({
        email: payload.email,
        uid: payload.uid,
        created_at: payload.created_at,
        color: payload.color,
      });

      console.log({ data, error })

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  },

  getUser: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("uid", payload.uid);

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  }
};

export default userProvider;
