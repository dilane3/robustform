import { generateUID, supabaseClient } from "../../utility";

const formProvider = {
  create: async (payload: any) => {
    try {
      const formKey = generateUID();

      const { data, error } = await supabaseClient
        .from("forms")
        .insert({
          title: payload.title,
          description: payload.description,
          folder_id: payload.folder_id,
          user_id: payload.user_id,
          form_key: formKey,
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
        .update({
          deleted: true,
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
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  },

  restore: async (payload: any) => {
    try {
      const { error } = await supabaseClient
        .from("forms")
        .update({
          deleted: false,
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
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
  },

  deleteDefinitely: async (payload: any) => {
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

  findOneByKey: async (key: string) => {
    try {
      const { data, error } = await supabaseClient
        .from("forms")
        .select("*, folders(id, name)")
        .eq("form_key", key)
        .eq("deleted", false)
        .single();

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
