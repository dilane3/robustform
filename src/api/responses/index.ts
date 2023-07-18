import { supabaseClient } from "../../utility";

const responseProvider = {
  createReponse: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient
        .from("responses")
        .insert({
          form_id: payload.formId,
        })
        .select("id, created_at")
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

  createReponseItem: async (payload: any) => {
    try {
      const { data, error } = await supabaseClient
        .from("response_items")
        .insert({
          values: payload.values,
          response_id: payload.responseId,
          question_id: payload.questionId,
        })
        .select("id")
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

  deleteResponse: async (payload: any) => {
    try {
      const { error } = await supabaseClient
        .from("reponses")
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
        .from("response_items")
        .select("*, responses(id, created_at, form_id, forms(folder_id))")
        .eq("responses.form_id", formId);

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

      console.log(payload);

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

export default responseProvider;
