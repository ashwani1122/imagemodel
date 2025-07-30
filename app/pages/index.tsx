import { useState } from 'react';

import html2canvas from 'html2canvas';
import ImageCropper from '../components/ImageCropper';
import ParallaxImage from '../components/ParallaxImage';

export default function Home() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [background, setBackground] = useState('from-indigo-500 via-purple-500 to-pink-500');

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const url = URL.createObjectURL(file);
        setUploadedImage(url);
        setCroppedImage(null);
        }
    };

    const handleCropComplete = (img: string) => {
        setCroppedImage(img);
    };

    const downloadImage = async () => {
        const wrapper = document.getElementById('photo-wrapper');
        if (wrapper) {
        const canvas = await html2canvas(wrapper);
        const link = document.createElement('a');
        link.download = '3d-photo.png';
        link.href = canvas.toDataURL();
        link.click();
        }
    };

    return (
        <main className={`min-h-screen w-full overflow-y-auto flex flex-col items-center justify-start p-6 bg-gradient-to-br ${background}`}>
        <h1 className="text-3xl font-bold text-white mb-6">3D DP & Wallpaper Maker</h1>

        <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-4"
        />

        {uploadedImage && !croppedImage && (
            <ImageCropper imageSrc={uploadedImage} onCropComplete={handleCropComplete} />
        )}

        {croppedImage && <ParallaxImage src={croppedImage} />}

        <div className="mt-6 grid grid-cols-2 gap-3">
    {[
        { name: 'Purple Glow', value: 'from-indigo-500 via-purple-500 to-pink-500' },
        { name: 'Ocean Breeze', value: 'from-green-400 via-blue-500 to-purple-600' },
        { name: 'Sunset Fire', value: 'from-yellow-400 via-red-500 to-pink-500' },
        { name: 'Tropical Mist', value: 'from-emerald-400 via-lime-500 to-green-400' },
        { name: 'Neon Lights', value: 'from-fuchsia-500 via-red-600 to-orange-400' },
    ].map((bg) => (
        <button
        key={bg.name}
        onClick={() => setBackground(bg.value)}
        className={`h-10 w-40 text-sm text-white font-semibold rounded shadow bg-gradient-to-r ${bg.value}`}
        >
        {bg.name}
        </button>
    ))}
</div>


        {croppedImage && (
            <button
            onClick={downloadImage}
            className="mt-6 px-6 py-3 bg-white rounded-lg font-semibold text-gray-800 shadow-lg"
            >
            Download Image
            </button>
        )}
        </main>
    );
}
