import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const jsonFilePath = path.join(process.cwd(), 'db.json');
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data.households || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
