import { useActions, useSignal } from "@dilane3/gx";
import React from "react";
import formProvider from "src/api/forms";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";

export default function useForms() {
  // Global actions
  const { setForms } = useActions("forms");

  // Global state
  const { loading } = useSignal<FormsState>("forms");

  // Effects
  React.useEffect(() => {
    const fetchAllForms = async () => {
      const { data, error } = await formProvider.findAll();

      if (error) {
      } else {
        const folders = organizeForms(data);

        console.log({ folders })

        setForms(folders);
      }
    };

    if (loading === false) return;

    fetchAllForms();
  }, [loading]);

  // Methods
  const organizeForms = (forms: any) => {
    const folders: Folder[] = [];

    for (const form of forms) {
      // Create a form entity
      const folderId = form.folder_id
        ? form.folder_id
        : form.deleted === true
        ? 1 // Deleted folder
        : 2; // Default folder

      const newForm = new Form({
        id: form.id,
        title: form.title,
        description: form.description,
        folderId,
        createdAt: new Date(form.created_at),
        updatedAt: new Date(form.updated_at || form.created_at),
        ownerId: form.user_id,
      });

      // Find the folder
      const folder = folders.find((folder) => folder.id === form.folder_id);

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

    return folders;
  };
}
