// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Neon DB URL
    ssl: { rejectUnauthorized: false },
});

// CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // 👈 allow from anywhere (use your frontend domain for stricter security)
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(req: Request , context: { params: Promise<{ token: string }>}) {
    try {
        const { username, password } = await req.json();
       
        const {token} = await context.params

        console.log(token)


        if (!username || !password || !token) {
            return new Response(
                JSON.stringify({ error: "Missing username, password or token" }),
                { status: 400, headers: corsHeaders }
            );
        }

        const client = await pool.connect();

        //console.log(client)

        // Step 1: find user by token
        const tokenRes = await client.query(
            `SELECT * FROM "user" WHERE "Token" = $1 `,
            [token]
        );

        if (tokenRes.rowCount === 0) {
            client.release();
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401,
                headers: corsHeaders,
            });
        }

        const user = tokenRes.rows[0];

        const APi_Rows = await client.query(
            `SELECT * FROM "api_user" WHERE "uid" = $1 AND "username" = $2 AND "password" = $3 `,
            [user?.id, username, password]
        );

        // Step 2: check username, password, and uid
        if (APi_Rows.rowCount == 0) {
            client.release();
            return new Response(JSON.stringify({ error: "Invalid credentials" }), {
                status: 401,
                headers: corsHeaders,
            });
        }

        const uid = user?.id

        const data = await client.query(
            `SELECT * FROM "information" WHERE "uid" = $1 `,
            [uid]
        );

        const info = data.rows[0] || {};

        const { rows: projectRows } = await client.query(
            `SELECT * FROM "project" WHERE "uid" = $1 `,
            [uid]
        );





        // Step 3: return user data
        client.release();
        return new Response(
            JSON.stringify({
                Information:info ,
                Projects:projectRows
            }),
            { status: 200, headers: corsHeaders }
        );
    } catch (err: any) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Server error", details: err.message }),
            { status: 500, headers: corsHeaders }
        );
    }
}


export async function GET() {
  return NextResponse.json(
    { message: "Hello from GET!" }, // your data
    { status: 200 } // status code
  );
}