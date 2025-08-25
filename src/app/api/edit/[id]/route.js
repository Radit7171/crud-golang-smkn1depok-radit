import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const body = await request.json(); // { id, nama, jurusan }

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://web-production-dbd6b.up.railway.app/teknisi/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to update data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Edit teknisi error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
