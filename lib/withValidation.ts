import { NextRequest, NextResponse } from "next/server";
import { ZodType } from "zod";

type MyRequest<T> = {
  request: NextRequest;
  body: T;
};

export const withValidation = <T = any>(
  schema: ZodType<T>,
  cb: ({ request, body }: MyRequest<T>) => void
) => {
  return async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validatedBody = schema.parse(body);
      return cb({ request, body: validatedBody });
    } catch (err) {
      return NextResponse.json("Invalid data", {
        status: 422,
      });
    }
  };
};
