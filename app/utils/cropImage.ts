export const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    if (ctx) {
        ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
        );
    }

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob!);
        resolve(url);
        }, 'image/jpeg');
    });
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });
