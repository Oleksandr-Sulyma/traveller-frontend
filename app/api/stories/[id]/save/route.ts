import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Заглушка POST' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Заглушка DELETE' });
}
