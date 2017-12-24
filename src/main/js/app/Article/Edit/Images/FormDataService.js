export const FormDataService = (formId) => {
    if (!document.getElementById) {
        throw  "Failed to upload image. This code needs to be ran only on the client."
    }

    let foundElement = document.getElementById(formId);

    if (!foundElement) {
       throw "Failed to upload image. Document does not contain correct element."
    }

    if (!(foundElement instanceof HTMLFormElement)) {
        throw "Failed to upload image. Document does not contain a form element with specified id."
    }

    return new FormData(foundElement);
};