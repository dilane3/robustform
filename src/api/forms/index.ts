import { supabaseClient } from "../../utility";

const formProvider = {
  create: async (payload: any) => {
    try {
      // TODO: generate a randomly form key

      const { data, error } = await supabaseClient
        .from("forms")
        .insert({
          title: payload.title,
          description: payload.description,
          folder_id: payload.folder_id,
          user_id: payload.user_id,
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
        .from("forms")
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
        .from("forms")
        .select("*, folders(id, name)")
        .eq("user_id", userId);

      if (data) {
        return {
          success: true,
          data,
        };
      }

      return {
        success: false,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  update: async (payload: any) => {
    try {
      const { error } = await supabaseClient
        .from("forms")
        .update({
          title: payload.title,
          description: payload.description,
        })
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
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};

export default formProvider;
