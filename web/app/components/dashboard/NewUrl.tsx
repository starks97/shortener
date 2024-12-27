import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import formDefinitions from "~/formDefinitions";
import { validationAction } from "~/utils/validationAction";

import { CreateUrlSchema } from "@models/url.models";

import { navigateWorkSpace } from "~/consts";

import { modalActions } from "~/utils/modalActions";
import {
  ApiResponse,
  SearchModalType,
  UrlCategories,
  UrlData,
  FieldErrors,
} from "@interfaces";
import Modal from "@components/Modal";
import { createNewUrl } from "~/utils/proxyClient";

export default function NewUrl() {
  const query = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const modalQueries = searchParams.get("modal") as SearchModalType | null;

  useEffect(() => {
    if (!modalQueries) {
      dialogRef.current?.close();
      return;
    }

    modalActions[modalQueries](dialogRef, undefined);
  }, [modalQueries]);

  const [inputValue, setInputValue] = useState<Record<string, string>>({
    original_url: "",
    short_url: "",
    category: "",
  });

  const urlFormDefinitions = formDefinitions["url"];

  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});

  const closeModal = () => {
    navigate(-1);
  };

  const mutation = useMutation<
    ApiResponse<UrlData>,
    string,
    { original_url: string; short_url: string; category: UrlCategories },
    unknown
  >({
    mutationFn: async ({
      original_url,
      short_url,
      category,
    }): Promise<ApiResponse<UrlData>> => {
      try {
        const response = await createNewUrl(original_url, short_url, category);
        if (response.status === "error") {
          throw Error(response.message);
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during creating the url.";
      }
    },
    onMutate: async (variables) => {
      setInputValue((prev) => ({ ...prev, ...variables }));
      setValidationErrors({});
    },
    onSuccess: () => {
      toast.success("Custom URL created!");
    },
    onError: (error) => {
      error
        ? toast.error(error)
        : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, errors } = await validationAction({
      formData: inputValue,
      schema: CreateUrlSchema,
    });

    if (errors) {
      setValidationErrors(errors);
      return;
    }

    mutation.mutate(data!);

    navigate(navigateWorkSpace, { replace: true });
  };

  return (
    <Modal
      id={`modal-create_url`}
      title={"Create new Url"}
      ref={dialogRef}
      close={closeModal}
    >
      <form onSubmit={handleSubmit} className="space-y-8" method="POST">
        {urlFormDefinitions.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type !== "select" ? (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={inputValue[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  validationErrors ? "border-red-500 " : "border-gray-300"
                }`}
                aria-invalid={!!validationErrors}
                aria-describedby={
                  validationErrors ? `${field.name}-error` : undefined
                }
              />
            ) : (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                value={inputValue[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  validationErrors ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!validationErrors}
                aria-describedby={
                  validationErrors ? `${field.name}-error` : undefined
                }
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {validationErrors[field.name] && (
              <p className="error-message">{validationErrors[field.name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black py-2 px-4 rounded "
        >
          {mutation.isPending ? "Creating..." : "Create URL"}
        </button>
      </form>
    </Modal>
  );
}
