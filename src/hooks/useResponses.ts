import { useActions, useSignal } from "@dilane3/gx";
import React from "react";
import responseProvider from "src/api/responses";
import Response from "src/entities/response/Response";
import ResponseItem from "src/entities/response/ResponseItem";

export default function useResponses(folderId: number | null, formId?: number) {
  // Global state
  const { setResponses } = useActions("forms");

  // Effects
  React.useEffect(() => {
    const fetchResponses = async () => {
      await handleFetchResponses();
    };

    fetchResponses();
  }, []);

  // Handlers
  const handleFetchResponses = async () => {
    if (!formId || !folderId) return;

    const { success, data, error } = await responseProvider.findAll(
      folderId,
      formId
    );

    if (success && data) {
      if (data.length > 0) {
        if (folderId !== null) {
          const responses: Response[] = [];
          for (const {
            id,
            values,
            question_id,
            responses: responseData,
          } of data) {
            // Create response Item
            const responseItem = new ResponseItem({
              id,
              values,
              questionId: question_id,
            });

            if (responseData) {
              // Verify if response already been added into the list
              const responseIndex = responses.findIndex(
                (res) => res.id === responseData.id
              );

              if (responseIndex !== -1) {
                responses[responseIndex].addResponseItem(responseItem);
              } else {
                const response = new Response({
                  id: responseData.id,
                  formId: responseData.form_id,
                  responseItems: [responseItem],
                });

                responses.push(response);
              }
            }
          }

          console.log(responses);

          setResponses({ folderId, formId, responses });
        }
      }
    }
  };
}
