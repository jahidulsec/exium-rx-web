import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const dataPath = searchParams.get("filePath");

  if (!dataPath)
    return NextResponse.json({ error: "bad request" }, { status: 404 });

  const filePath = path.join(process.cwd(), "storage" + dataPath);

  console.log(filePath)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  return new NextResponse(file as any);
}
