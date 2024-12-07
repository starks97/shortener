import { FormField } from "./interfaces";

const formDefinitions: Record<string, FormField[]> = {
  login: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ],
  register: [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ],
  url: [
    {
      name: "original_url",
      type: "text",
      label: "Original url",
      placeholder: "https://company.com",
      required: true,
    },
    {
      name: "short_url",
      type: "text",
      label: "Custom short url",
      placeholder: "custom short url",
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      placeholder: "Select a category",
      required: true,
      options: [
        { value: "Tech", label: "Tech" },
        { value: "News", label: "News" },
        { value: "Music", label: "Music" },
        { value: "Sports", label: "Sports" },
        { value: "Movies", label: "Movies" },
        { value: "Education", label: "Education" },
        { value: "Science", label: "Science" },
        { value: "Gaming", label: "Gaming" },
      ],
    },
  ],
};

export default formDefinitions;
