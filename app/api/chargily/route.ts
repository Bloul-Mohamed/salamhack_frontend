import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const price = searchParams.get('price')
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: `{"amount":${price?.split(" ")[0]},"currency":"dzd","success_url":"https://cv-genius-m.vercel.app/success"}`,
      };
  
      const response = await fetch(
        "https://pay.chargily.net/test/api/v2/checkouts",
        options
      );
  
      const data = await response.json();
  
      console.log("this is the checkout url yess");
      console.log(data?.checkout_url);
  
      return Response.json({ data });
    } catch (err) {
      console.log(err);
    }
  }