import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { UpdateUrlSchemaType, UpdateUrlSchema } from "~/models/url.models";
import { validationAction } from "@utils/validationAction";
import formDefinitions from "~/formDefinitions";

import { UrlCategories } from "~/interfaces";

import { OverWriteIcon, CheckIcon, CloseIcon } from "../Icons";

interface Props {
  id: string;
  short_url: string;
  original_url: string;
  category: UrlCategories;
}

export default function UrlUpdater({ ...props }: Props) {
  const [fieldBeingEdited, setFieldBeingEdited] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Record<string, string>>({
    original_url: props.original_url,
    short_url: props.short_url,
    category: props.category,
  });

  const handleEdit = (fieldName: string) => {
    setFieldBeingEdited(fieldName);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputValue({
      original_url: props.original_url,
      short_url: props.short_url,
      category: props.category,
    });
    setFieldBeingEdited(null);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputValue((prev) => ({ ...prev, category: event.target.value }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setInputValue((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFieldBeingEdited(null);
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
                  >
                    {field.name !== "category" && (
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={inputValue[field.name]}
                        onChange={(e) => handleInputChange(e, field.name)}
                      />
                    )}

                    {field.name === "category" && (
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={inputValue["category"]}
                        onChange={handleCategoryChange}
                      >
                        {Object.values(UrlCategories)
                          .filter((category) => category !== UrlCategories.All)
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
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
