import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 20;
  const offset = searchParams.get("offset") || 0;
  const search = searchParams.get("search") || "";

  try {
    let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    if (search) {
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${search}`;
      const response = await axios.get(apiUrl);
      return NextResponse.json(response.data);
    }

    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
