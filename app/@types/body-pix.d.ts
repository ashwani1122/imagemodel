declare module '@tensorflow-models/body-pix' {
  // This type represents the segmentation result
    export interface SemanticPersonSegmentation {
        data: Uint8Array;
        width: number;
        height: number;
    }

    // The BodyPix model interface
    export interface BodyPix {
        segmentPersonParts(
        image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
        config?: any
        ): Promise<SemanticPersonSegmentation>;
    }

    // Load function returns a BodyPix model instance
    export function load(config?: any): Promise<BodyPix>;
}
