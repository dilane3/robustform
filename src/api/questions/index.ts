import { supabaseClient } from "../../utility";

const questionProvider = {
  create: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient
        .from("elements")
        .insert({
          type: payload.type,
          question_type: payload.questionType,
          position: payload.position,
          form_id: payload.formId,
        })
        .select("id")
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
        .from("elements")
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

  findAll: async (formId: number) => {
    try {
      const { data, error } = await supabaseClient
        .from("elements")
        .select("*")
        .eq("form_id", formId);

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
        .from("elements")
        .update({
          title: payload.title,
          description: payload.description,
          sub_title: payload.subtitle,
          position: payload.position,
          options: payload.options,
          media: payload.media,
        })
        .eq("id", payload.id);

      console.log(payload)

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

export default questionProvider;
