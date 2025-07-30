'use client';
import React, { useRef } from 'react';
import styles from './ParallaxImage.module.css';

type Props = {
  src: string;
};

const ParallaxImage = ({ src }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const currentTarget = e.currentTarget as HTMLDivElement;

  if (!imageRef.current) return;

  const width = currentTarget.clientWidth;
  const height = currentTarget.clientHeight;

  const { offsetX, offsetY } = e.nativeEvent;
  const rotateX = ((offsetY - height / 2) / height) * -20;
  const rotateY = ((offsetX - width / 2) / width) * 20;

  imageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

  const resetTransform = () => {
  if (imageRef.current) {
    imageRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }
};

  return (
    <div
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      id="photo-wrapper"
    >
      <img ref={imageRef} src={src} alt="3D Photo" className={styles.image} />
    </div>
  );
};

export default ParallaxImage;
