import commentsData from "@/data/comments.json";

export type SocialComment = {
  id: string;
  author: string;
  platform: "facebook" | "x" | "youtube" | "manual";
  text: string;
  date: string;
};

const PLATFORM_LABELS: Record<SocialComment["platform"], string> = {
  facebook: "فيسبوك",
  x: "إكس",
  youtube: "يوتيوب",
  manual: "مجتمع المستمعين",
};

export function getPlatformLabel(platform: SocialComment["platform"]): string {
  return PLATFORM_LABELS[platform];
}

export function getCuratedComments(): SocialComment[] {
  return commentsData as SocialComment[];
}
