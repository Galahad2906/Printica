// src/components/PublicBanner.tsx
import { FC } from 'react'

type PublicBannerProps = {
  imagenPC: string
  imagenTablet: string
  imagenMovil: string
  enlace: string
  activo: boolean
  loading?: boolean
}

const PublicBanner: FC<PublicBannerProps> = ({
  imagenPC,
  imagenTablet,
  imagenMovil,
  enlace,
  activo,
  loading = false,
}) => {
  if (loading) {
    // Shimmer de carga
    return (
      <div className="w-full h-48 md:h-64 lg:h-80 bg-gray-200 animate-pulse rounded-lg" />
    )
  }

  if (!activo) return null

  const bannerContent = (
    <picture>
      <source media="(max-width: 640px)" srcSet={imagenMovil} />
      <source media="(max-width: 1024px)" srcSet={imagenTablet} />
      <img
        src={imagenPC}
        alt="Banner principal"
        className="w-full object-cover"
        onError={(e) => {
          const target = e.currentTarget
          target.src =
            'https://via.placeholder.com/1600x400?text=Banner+no+disponible'
        }}
      />
    </picture>
  )

  return (
    <div className="w-full">
      {enlace ? (
        <a href={enlace} target="_blank" rel="noopener noreferrer">
          {bannerContent}
        </a>
      ) : (
        bannerContent
      )}
    </div>
  )
}

export default PublicBanner
