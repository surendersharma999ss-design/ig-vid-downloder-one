
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";
import { wrapperFetchJsonResponse } from "@/features/api/utils";
import React from "react";

// Utility function to fetch video URL by shortcode (for API usage)
export async function getInstagramVideoUrl(shortcode: string): Promise<string | null> {
  try {
    // Use absolute URL on server, relative on client
    const isServer = typeof window === 'undefined';
    const base = isServer ? 'https://ig-vid-downloder-one.vercel.app' : '';
    const res = await fetch(`${base}/api/instagram/p/${shortcode}`);
    if (!res.ok) return null;
    const json = await res.json() as { data?: { xdt_shortcode_media?: { video_url?: string } } };
    const videoUrl = json?.data?.xdt_shortcode_media?.video_url;
    return videoUrl || null;
  } catch {
    return null;
  }
}

export type GetInstagramPostRequest = {
  shortcode: string;
};

export type GetInstagramPostResponse = IG_GraphQLResponseDto;

// ...existing code...
import { useFetch } from "@/features/api/hooks/use-fetch";
import { RequestConfigType } from "@/types/request-config";

export function useGetInstagramPost() {
  const fetch = useFetch();

  return React.useCallback(
    (data: GetInstagramPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`/api/instagram/p/${data.shortcode}`, requestConfig).then(
        wrapperFetchJsonResponse<GetInstagramPostResponse>
      );
    },
    [fetch]
  );
}
