import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "~/interfaces";
import { useNavigate } from "@remix-run/react";
import toast from "react-hot-toast";
import { workspace } from "~/consts";

export default function DeleteRecordBtn({ id }: { id: string }) {
  const query = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<
    ApiResponse<null>,
    string,
    { id: string },
    unknown
  >({
    mutationFn: async ({ id }): Promise<ApiResponse<null>> => {
      try {
        const deleteRecord = await fetch(`/api/proxy?url=delete&id=${id}`, {
          headers: {
            method: "DELETE",
            "Content-Type": "application/json",
          },
        });

        const res = (await deleteRecord.json()) as ApiResponse<null>;

        if (res.status === "error") {
          throw new Error("something happend");
        }

        return res;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during deleting the url.";
      }
    },
    onMutate: async ({ id }) => {
      await query.cancelQueries({ queryKey: ["url", id] });
    },
    onSuccess: (res) => {
      toast.success(res.message!);
    },
    onError: (error) => {
      error
        ? toast.error(error)
        : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: async () => {
      await query.invalidateQueries({ queryKey: ["urls"] });
      query.removeQueries({ queryKey: ["url", id] });
    },
  });

  const handleDeleteUrlRecord = async (event: React.MouseEvent) => {
    event.preventDefault();
    mutation.mutate({ id });
    navigate(workspace, { replace: true });
  };

  return (
    <>
      <button
        className="border-2 border-red-600 px-5 py-2 text-red-500"
        onClick={handleDeleteUrlRecord}
      >
        Delete Record
      </button>
    </>
  );
}
