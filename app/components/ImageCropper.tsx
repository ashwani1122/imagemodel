'use client';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { getCroppedImg } from '../utils/cropImage';
type Props = {
    imageSrc: string;
    onCropComplete: (croppedImage: string) => void;
};

const ImageCropper = ({ imageSrc, onCropComplete }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDone = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
    };

    return (
        <div className="relative w-full h-[400px] bg-black">
        <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square for DP
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
        />
        <div className="absolute bottom-4 w-full px-4">
            <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, z) => setZoom(z as number)}
            />
            <button onClick={handleDone} className="mt-2 w-full bg-white text-black py-2 rounded">
            Done Cropping
            </button>
        </div>
        </div>
    );
};

export default ImageCropper;
