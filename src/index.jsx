import React from 'react';

const LGContainer = ({  contentClass = '',
                         config = {},
                         children }) => {

    const defaultConfig = {
        width: 300,
        height: 600,
        radius: 50,
        bevelWidth: 0.1,
        bevelBlur: 7,
        backgroundBlur: 3,
        warpAmount: 0.07,
        warpDistance: 50,
        warpDirection: -180,
    };

    const finalConfig = {
        ...defaultConfig,
        ...config
    };

    const id = `lgc-${Math.random() * 100}`

    const filter = () => {
        const borderX = Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5);

        const svg = `
<svg class="displacement-image" viewBox="0 0 ${finalConfig.width} ${finalConfig.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}-red" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="red"/>
    </linearGradient>
    <linearGradient id="${id}-blue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>

    <!-- backdrop -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" fill="black"></rect>

    <!-- red linear -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" rx="${finalConfig.radius}" fill="url(#${id}-red)" />

     <!-- blue linear -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" rx="${finalConfig.radius}" fill="url(#${id}-blue)" style="mix-blend-mode: difference" />

    <!-- block out distortion -->
    <rect
      x="${borderX}"
      y="${Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5)}"
      width="${finalConfig.width - borderX * 2}"
      height="${finalConfig.height - borderX * 2}"
      rx="${finalConfig.radius}"
      fill="hsl(0 0% ${finalConfig.warpDistance}% / ${1 - finalConfig.warpAmount})"
      style="filter:blur(${finalConfig.bevelBlur}px)" />
</svg>`;

        const encoded = encodeURIComponent(svg);
        const dataUri = `data:image/svg+xml,${encoded}`;

        return dataUri;
    }


    const containerStyles = {
        width: `${finalConfig.width}px`,
        height: `${finalConfig.height}px`,
        borderRadius: `${finalConfig.radius}px`,
        backdropFilter: `url(#${id}-filter) blur(${finalConfig.backgroundBlur * 0.1}px)`,
        boxShadow: `inset 0 0 2px 1px rgba(255,255,255, 0.3), inset 0 0 10px 1px rgba(255,255,255, 0.3), 0 10px 20px rgba(0,0,0, 0.2)`,
        position: `relative`,
        overflow: `hidden`,
        display: `flex`,
    };

    const filterStyles = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        touchAction: 'none',
        pointerEvents: 'none'
    }

    return (
        <div className="LGContainer" style={containerStyles}>
            <div className={contentClass}>
                {children}
            </div>

            <svg className="LGFilter" style={filterStyles} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id={`${id}-filter`} colorInterpolationFilters="sRGB">
                        <feImage x="0" y="0" width="100%" height="100%" result="map" href={filter()}/>
                        <feDisplacementMap
                            in2="map"
                            in="SourceGraphic"
                            yChannelSelector="B"
                            xChannelSelector="R"
                            scale={finalConfig.warpDirection}
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

// Named export
export { LGContainer };

// Default export
export default LGContainer;