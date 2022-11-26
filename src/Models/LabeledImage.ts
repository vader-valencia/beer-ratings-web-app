export default interface LabeledImage {
    label: string;
    imageSource: string;
}

export interface LabeledImageListResponse{
    items : LabeledImage[]
}