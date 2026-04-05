import { prisma } from "./prisma";

export type ClubSettings = {
  CLUB_NAME: string;
  CLUB_LOGO: string;
  WHATSAPP_NUMBER: string;
  NOTIFICATION_EMAIL: string;
  SUMUP_LINK: string;
  LAST_MATCH_SYNC: string;
  PRIMARY_COLOR: string;
  SECONDARY_COLOR: string;
};

const DEFAULT_SETTINGS: ClubSettings = {
  CLUB_NAME: "Castlebar Celtic FC",
  CLUB_LOGO: "/upscale_image.png",
  WHATSAPP_NUMBER: "353871924100",
  NOTIFICATION_EMAIL: "pro@castlebarceltic.ie",
  SUMUP_LINK: "https://sumup.ie/castlebarceltic",
  LAST_MATCH_SYNC: "",
  PRIMARY_COLOR: "#008236",
  SECONDARY_COLOR: "#0B111D",
};

export async function getClubSettings(): Promise<ClubSettings> {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc: any, s: any) => {
      acc[s.key as keyof ClubSettings] = s.value;
      return acc;
    }, {} as any);

    return {
       ...DEFAULT_SETTINGS,
       ...settingsMap
    };
  } catch (error) {
    console.error("Error fetching club settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateClubSetting(key: keyof ClubSettings, value: string) {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
