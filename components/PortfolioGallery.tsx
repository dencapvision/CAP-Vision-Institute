import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { PortfolioImage } from '../services/portfolio';

interface Props {
  images: PortfolioImage[];
}

const PortfolioGallery: React.FC<Props> = ({ images }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const open = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : 0));

  const [cover, ...rest] = images;
  const isSingle = rest.length === 0;
  const isDouble = rest.length === 1;

  return (
    <>
      <div className={`grid gap-3 md:gap-4 ${isSingle ? 'grid-cols-1' : isDouble ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
        {/* Cover — full width when single, half when double, 2-cols when 3+ */}
        <div
          className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
            isSingle ? 'h-72 md:h-96' : isDouble ? 'h-56 md:h-72' : 'col-span-2 h-64 md:h-80'
          }`}
          onClick={() => open(0)}
        >
          <img
            src={cover.image_url}
            alt={cover.caption || ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {cover.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-xs font-medium leading-relaxed">{cover.caption}</p>
            </div>
          )}
        </div>

        {/* Rest of images */}
        {rest.map((img, i) => (
          <div
            key={img.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${isDouble ? 'h-56 md:h-72' : 'h-40 md:h-48'}`}
            onClick={() => open(i + 1)}
          >
            <img
              src={img.image_url}
              alt={img.caption || `ภาพที่ ${i + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-[10px] font-medium line-clamp-2">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIdx].image_url}
              alt={images[lightboxIdx].caption || ''}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            {images[lightboxIdx].caption && (
              <p className="text-white/80 text-sm text-center mt-4 font-medium leading-relaxed">
                {images[lightboxIdx].caption}
              </p>
            )}
            <p className="text-white/40 text-xs text-center mt-2">
              {lightboxIdx + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PortfolioGallery;
