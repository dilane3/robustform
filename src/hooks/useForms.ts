import { useActions, useSignal } from "@dilane3/gx";
import React from "react";
import folderProvider from "src/api/folders";
import formProvider from "src/api/forms";
import questionProvider from "src/api/questions";
import Card from "src/entities/card/Card";
import Question from "src/entities/card/Question";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import { FormsState, folderBin, otherFormsFolder } from "src/gx/signals";
import { AuthState } from "src/gx/signals/auth";
import {
  FOLDER_BIN_ID,
  OTHERS_FORMS_FOLDER_ID,
} from "src/gx/signals/forms/constants";

export default function useForms() {
  // Global actions
  const { setForms } = useActions("forms");

  // Global state
  const { loading, forms } = useSignal<FormsState>("forms");
  const { user } = useSignal<AuthState>("auth");

  // Effects
  React.useEffect(() => {
    const fetchAllForms = async () => {
      if (user && forms.length === 0) {
        const { data, error } = await formProvider.findAll(user.id);

        if (error) {
        } else {
          // Get all folders
          const { data: fetchedFolders } = await folderProvider.findAll(
            user.id
          );

          if (fetchedFolders && data) {
            const formsClone = [...data];

            // Get all questions of each form
            for (const form of data) {
              const { data: questionsData } = await questionProvider.findAll(
                form.id
              );

              const index = formsClone.findIndex((f) => f.id === form.id);

              if (index !== -1) {
                formsClone[index].questions = questionsData || [];
              }
            }

            console.log({ formsClone, fetchedFolders })

            const folders = organizeForms(formsClone, fetchedFolders);

            setForms(folders);
          }
        }
      }
    };

    if (loading === false) return;

    fetchAllForms();
  }, [loading, user]);

  // Methods
  const organizeForms = (forms: any, fetchedFolders: any) => {
    const folders: Folder[] = [folderBin, otherFormsFolder];

    for (const form of forms) {
      // Create a form entity
      const folderId = form.folder_id
        ? form.folder_id
        : form.deleted === true
        ? FOLDER_BIN_ID // Deleted folder
        : OTHERS_FORMS_FOLDER_ID; // Default folder

        console.log(folderId)

      // Prepare questions
      const cards: Card[] = [];

      for (const q of form.questions) {
        const question = new Question({
          label: q.title,
          options: q.options,
        });

        const cardPayload = {
          id: q.id,
          title: q.title,
          description: q.description,
          formId: q.form_id,
          type: q.type,
          questionType: q.question_type,
          createdAt: new Date(q.created_at),
          position: q.position,
          question,
          active: false,
        };

        const card = new Card(cardPayload);

        cards.push(card);
      }

      const newForm = new Form({
        id: form.id,
        title: form.title,
        description: form.description,
        folderId,
        createdAt: new Date(form.created_at),
        updatedAt: new Date(form.updated_at || form.created_at),
        ownerId: form.user_id,
        cards,
      });

      console.log({ forms });

      // Find the folder
      const folder = folders.find(
        (folder) => folder.id === folderId
      );

      if (folder) {
        folder.addForm(newForm);
      } else {
        // Create new folder
        const newFolder = new Folder({
          id: form.folders.id,
          name: form.folders.name,
          forms: [newForm],
        });

        folders.push(newFolder);
      }
    }

    // Check if there are empty folders
    for (const folder of fetchedFolders) {
      const folderExists = folders.find((f) => f.id === folder.id);

      if (!folderExists) {
        const newFolder = new Folder({
          id: folder.id,
          name: folder.name,
          forms: [],
        });

        folders.push(newFolder);
      }
    }

    return folders;
  };
}
