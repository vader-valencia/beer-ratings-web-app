export default interface LabeledImage {
    label: string;
    imageSource: string;
    rating: number | null;
    numRatings: number;
}

export interface LabeledImageListResponse {
    items: LabeledImage[]
}