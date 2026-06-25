import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/callback/google'
    );

    const { tokens } = await oauth2Client.getToken(code);
    
    // For a hackathon demo, we will persist this directly to a local JSON file 
    // to act as our "database" for the user's refresh token.
    const tokenPath = path.join(process.cwd(), '.google-token.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));

    return NextResponse.redirect(new URL('/?auth=success', request.url));
  } catch (error) {
    console.error('Error exchanging token', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}
