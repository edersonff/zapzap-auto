export type SocialType =
  | "meta"
  | "tiktok"
  | "youtube"
  | "pinterest"
  | "instagram"
  | "telegram"
  | "snapchat"
  | "twitter";

export type Social = CreateSocial & {
  id: number;
  user: User;
};

export type CreateSocial = {
  type: SocialType;
  user?: string;
  password?: string;
  token?: string;
};
