import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { UpdateUrlSchema } from "~/models/url.models";
import { validationAction } from "@utils/validationAction";
import formDefinitions from "~/formDefinitions";

import { updateUrl } from "~/utils/proxyClient";

import CustomDropdown from "../CustomDropDown";

import {
  UrlCategories,
  ApiResponse,
  FieldErrors,
  UrlUpdaterPropsTypes,
} from "~/interfaces";

import { OverWriteIcon, CheckIcon, CloseIcon } from "../Icons";

export default function UrlUpdater({
  category,
  id,
  original_url,
  short_url,
}: UrlUpdaterPropsTypes) {
  const query = useQueryClient();
  const [fieldBeingEdited, setFieldBeingEdited] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Record<string, string>>({
    original_url: original_url,
    short_url: short_url,
    category: category as UrlCategories,
  });
  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});

  const mutation = useMutation<
    ApiResponse<null>,
    string,
    { original_url?: string; short_url?: string; category?: UrlCategories },
    unknown
  >({
    mutationFn: async ({
      original_url,
      short_url,
      category,
    }): Promise<ApiResponse<null>> => {
      try {
        const update = await updateUrl<ApiResponse<null>>(
          id,
          short_url!,
          original_url!,
          category
        );

        if (update.status === "error") {
          throw Error(update.message);
        }

        return update;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during updating the url.";
      }
    },
    onMutate: async (variables) => {
      setFieldBeingEdited(null);
      setInputValue((prev) => ({ ...prev, ...variables }));
      setValidationErrors({});
    },
    onSuccess: (data) => {
      toast.success(data.message!);
      setFieldBeingEdited(null);
    },
    onError: (error) => {
      error
        ? toast.error(error)
        : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["url", id] });
      query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const handleEdit = (fieldName: string) => {
    setFieldBeingEdited(fieldName);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputValue({
      original_url: original_url,
      short_url: short_url,
      category: category,
    });
    setFieldBeingEdited(null);
  };

  const handleCtgChange = (selectedCategory: UrlCategories) => {
    setInputValue((prev) => ({ ...prev, category: selectedCategory }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setInputValue((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, errors } = await validationAction({
      formData: inputValue,
      schema: UpdateUrlSchema,
    });

    if (errors) {
      setValidationErrors(errors);
      return;
    }

    if (data) {
      const updateData: {
        original_url?: string;
        short_url?: string;
        category?: UrlCategories;
      } = {};

      if (fieldBeingEdited === "original_url") {
        updateData.original_url = data.original_url;
      } else if (fieldBeingEdited === "short_url") {
        updateData.short_url = data.short_url;
      } else if (fieldBeingEdited === "category") {
        updateData.category = data.category;
      }

      mutation.mutate(updateData);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div className="flex flex-col align-start">
          {formDefinitions["url"].map((field) => {
            const fieldValue = inputValue[field.name];

            const displayValue =
              fieldValue.length > 30
                ? `${fieldValue.slice(0, 20)}...`
                : fieldValue;

            return (
              <div key={field.name} className="mb-4">
                {fieldBeingEdited !== field.name && (
                  <div className="flex w-full flex-col md:flex-row">
                    <span className="text-gray-200 w-1/4">{field.name}</span>
                    <div className="flex flex-row align-start">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEdit(field.name)}
                      >
                        <OverWriteIcon />
                      </button>
                      <span className="text-gray-600 text-lg line-clamp-1">
                        {displayValue}
                      </span>
                    </div>
                  </div>
                )}

                {fieldBeingEdited === field.name && (
                  <form
                    className="mb-4 flex items-center justify-start w-full"
                    onSubmit={handleSubmit}
                    method="PATCH"
                    action={`/workspace/${id}`}
                  >
                    {validationErrors?.general && (
                      <div className="text-red-500 text-sm mb-4">
                        {validationErrors?.genera}
                      </div>
                    )}
                    {field.name !== "category" && (
                      <input
                        type="text"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${
                          validationErrors
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        value={inputValue[field.name]}
                        onChange={(e) => handleInputChange(e, field.name)}
                        aria-invalid={!!validationErrors}
                        aria-describedby={
                          validationErrors ? `${field.name}-error` : undefined
                        }
                      />
                    )}

                    {field.name === "category" && (
                      <CustomDropdown
                        label="Category"
                        selectedCategory={
                          inputValue["category"] as UrlCategories
                        }
                        onSelectCategory={handleCtgChange}
                      />
                    )}

                    {validationErrors.fieldError && (
                      <div className="text-red-500 text-sm mb-4">
                        {validationErrors.fieldError}
                      </div>
                    )}

                    <button
                      className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
                      type="submit"
                    >
                      <CheckIcon />
                    </button>
                    <button
                      className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
                      onClick={handleCancel}
                    >
                      <CloseIcon />
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
