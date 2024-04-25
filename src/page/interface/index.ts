export interface ModleProps{
      AssetID: string,
      AssetThumbnail: string,
      AssetType: string
}
export interface Auction{
    herf: string | undefined;
      id: number;
    name: string;
    description: string;
    startPrice: number;
    currentBid: number;
    startTime: string;
    endTime: string;
    images: string[];
    category: string;
    status: string;
}