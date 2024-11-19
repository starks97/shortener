import { ApiResponse, Me } from "~/interfaces";

export default async function me(token: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = (await res.json()) as ApiResponse<Me>;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    return null;
  }
}
