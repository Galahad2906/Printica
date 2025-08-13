// src/components/PublicBanner.tsx
import { FC } from 'react';

type PublicBannerProps = {
  imagenPC: string;
  imagenTablet?: string;
  imagenMovil?: string;
  enlace?: string;
  activo: boolean;
  loading?: boolean;
};

const PLACEHOLDER =
  'https://via.placeholder.com/1600x400?text=Banner+no+disponible';

const PublicBanner: FC<PublicBannerProps> = ({
  imagenPC,
  imagenTablet,
  imagenMovil,
  enlace,
  activo,
  loading = false,
}) => {
  if (loading) {
    return <div className="w-full h-48 md:h-64 lg:h-80 bg-gray-200 animate-pulse rounded-lg" />;
  }

  if (!activo) return null;

  // Fallbacks: móvil -> (movil || tablet || pc), tablet -> (tablet || pc), pc -> (pc || placeholder)
  const pcSrc = (imagenPC || '').trim() || PLACEHOLDER;
  const tabletSrc = (imagenTablet || '').trim() || pcSrc;
  const mobileSrc = (imagenMovil || '').trim() || tabletSrc;

  const bannerContent = (
    <picture>
      {/* Solo renderizamos <source> si tenemos algo válido */}
      {mobileSrc && <source media="(max-width: 640px)" srcSet={mobileSrc} />}
      {tabletSrc && <source media="(max-width: 1024px)" srcSet={tabletSrc} />}
      <img
        src={pcSrc}
        alt="Banner principal"
        className="w-full object-cover rounded-lg"
        loading="eager"
        decoding="async"
        sizes="(max-width:640px) 100vw, (max-width:1024px) 100vw, 100vw"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== PLACEHOLDER) target.src = PLACEHOLDER;
        }}
      />
    </picture>
  );

  return enlace ? (
    <a href={enlace} target="_blank" rel="noopener noreferrer" className="block">
      {bannerContent}
    </a>
  ) : (
    <div className="w-full">{bannerContent}</div>
  );
};

export default PublicBanner;
