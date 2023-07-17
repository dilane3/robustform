import { supabaseClient } from "../../utility";

const folderProvider = {
  create: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient.from("folders").insert({
        name: payload.name,
        user_id: payload.userId,
      })
      .select("*")
      .single();

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

  delete: async (payload: any) => {
    try {
      const { error } = await supabaseClient
        .from("folders")
        .delete()
        .eq("id", payload.id);

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
      };  
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  },

  findAll: async (userId: number) => {
    try {
      const { data, error } = await supabaseClient
        .from("folders")
        .select("*")
        .eq("user_id", userId);


      if (data) {
        return {
          success: true,
          data
        }
      }

      return {
        success: false,
        error
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};

export default folderProvider;
