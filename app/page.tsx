'use client';
import {  useState } from 'react';
import ImageCropper from './components/ImageCropper';
import ParallaxImage from './components/ParallaxImage';
import html2canvas from 'html2canvas';

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [background, setBackground] = useState('from-indigo-500 via-purple-500 to-pink-500');

  const backgroundOptions = [
    { name: 'Purple Glow', value: 'from-indigo-500 via-purple-500 to-pink-500' },
    { name: 'Ocean Breeze', value: 'from-green-400 via-blue-500 to-purple-600' },
    { name: 'Sunset Fire', value: 'from-yellow-400 via-red-500 to-pink-500' },
    { name: 'Tropical Mist', value: 'from-emerald-400 via-lime-500 to-green-400' },
    { name: 'Neon Lights', value: 'from-fuchsia-500 via-red-600 to-orange-400' },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setCroppedImage(null);
    }
  };

  const handleCropComplete = (croppedImg: string) => {
    setCroppedImage(croppedImg);
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
    <main
      className={`min-h-screen overflow-y-auto flex flex-col items-center justify-start p-6 bg-gradient-to-br ${background}`}
    >
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        3D-Like Photo Editor
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4 text-white"
      />

      {/* Image Cropper */}
      {uploadedImage && !croppedImage && (
        <ImageCropper imageSrc={uploadedImage} onCropComplete={handleCropComplete} />
      )}

      {/* Parallax Image */}
      {croppedImage && (
        <div className="mt-6">
          <ParallaxImage src={croppedImage} />
        </div>
      )}

      {/* Background Filter Picker */}
      <div className="mt-8">
        <label className="text-white font-medium mr-2">Choose Background:</label>
        <select
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="p-2 rounded bg-white text-black"
        >
          {backgroundOptions.map((bg) => (
            <option key={bg.name} value={bg.value}>
              {bg.name}
            </option>
          ))}
        </select>

      </div>
     
      {/* Download Button */}
      {croppedImage && (
        <button
          onClick={downloadImage}
          className="mt-6 px-6 py-3 bg-white rounded-lg font-semibold text-gray-800 shadow-lg hover:bg-gray-200"
        >
          Download Image
        </button>
      )}
      
      <p className="mt-10 text-white text-sm opacity-60 text-center">
        Made with ❤️ in Next.js – Customize & Save your stunning 3D DP or wallpaper
      </p>
    </main>
  );
}
