import clientPromise from '@/lib/db';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function flights(req) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:flights'],
    });
    // const apiPort = process.env.API_PORT || 3001;
    // const response = await fetch(`http://localhost:${apiPort}/api/flights`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    const client = await clientPromise;
    const db = client.db('parceflyte');
    const flights = await db.collection('flights').find({}).sort({ metacritic: -1 }).limit(10).toArray();

    return NextResponse.json(flights, res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
