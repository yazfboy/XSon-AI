import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Palette,
  RefreshCw,
  Download,
  Sparkles,
  Layers,
  FileCode2,
  Wand2,
} from 'lucide-react';
import {
  BrandLogoConcept,
  EmotionOption,
  IndustryOption,
  LogoArtDirectionSpec,
  LogoCreativeArchetype,
  LogoUspEffect,
  LogoVisualPrimitive,
} from '../utils/brandEngine';

gsap.registerPlugin(ScrollTrigger);

interface BrandLogoStudioSectionProps {
  brandName: string;
  domainName: string;
  brandDescription?: string;
  logos: [BrandLogoConcept, BrandLogoConcept];
  industry: IndustryOption;
  emotion: EmotionOption;
  onRegenerateLogos: () => void;
  auditVersion?: number;
}

const VALID_PRIMITIVES = new Set<LogoVisualPrimitive>([
  'phone_mobile',
  'shop_cart',
  'chart_growth',
  'lightning_fast',
  'flame_hot',
  'leaf_organic',
  'droplet_pure',
  'coffee_mug',
  'bakery_food',
  'sports_car',
  'wheel_speed',
  'camera_lens',
  'sound_stage',
  'dress_fashion',
  'gem_luxury',
  'lotus_spa',
  'tooth_dental',
  'heart_care',
  'paw_pet',
  'building_arch',
  'airplane_globe',
  'book_grad',
  'ai_spark',
  'shield_trust',
  'sun_horizon',
  'star_crown',
  'gift_box',
  'clock_247',
]);

const VALID_USP_EFFECTS = new Set<LogoUspEffect>([
  'speed_trails',
  'organic_halo',
  'sparkle_stars',
  'orbital_rings',
  'sound_waves',
  'precision_grid',
  'sunburst_rays',
  'shield_aura',
]);

const VALID_ARCHETYPES = new Set<LogoCreativeArchetype>([
  'fusion_monogram',
  'kinetic_horizon',
  'orbital_constellation',
  'editorial_atelier',
  'organic_bloom',
  'bauhaus_modular',
  'circular_stamp',
  'isometric_prism',
]);

const ARCHETYPE_OPTIONS: Array<{
  id: LogoCreativeArchetype;
  shortLabel: string;
  fullTitle: string;
}> = [
  {
    id: 'fusion_monogram',
    shortLabel: 'Chữ lồng sản phẩm',
    fullTitle: 'Chữ Cái Độc Bản Lồng Ghép Sản Phẩm',
  },
  {
    id: 'kinetic_horizon',
    shortLabel: 'Dải chuyển động',
    fullTitle: 'Dải Chuyển Động Khí Động Học',
  },
  {
    id: 'orbital_constellation',
    shortLabel: 'Hệ sinh thái quỹ đạo',
    fullTitle: 'Hệ Sinh Thái Đa Biểu Tượng',
  },
  {
    id: 'editorial_atelier',
    shortLabel: 'Đường nét tinh hoa',
    fullTitle: 'Nghệ Thuật Đường Nét Tinh Hoa',
  },
  {
    id: 'organic_bloom',
    shortLabel: 'Hữu cơ mềm mại',
    fullTitle: 'Khối Hữu Cơ Mềm Mại & Thân Thiện',
  },
  {
    id: 'bauhaus_modular',
    shortLabel: 'Hình học Bauhaus',
    fullTitle: 'Hình Học Sáng Tạo Bauhaus',
  },
  {
    id: 'circular_stamp',
    shortLabel: 'Ấn chương vòng cung',
    fullTitle: 'Ấn Chương Nghệ Thuật Vòng Cung',
  },
  {
    id: 'isometric_prism',
    shortLabel: 'Lăng kính 3D',
    fullTitle: 'Không Gian Lăng Kính Đa Chiều',
  },
];

function isValidHex(color: unknown): color is string {
  return typeof color === 'string' && /^#[0-9A-Fa-f]{6}$/.test(color.trim());
}

/**
 * 28 COMPOSABLE GRANULAR VISUAL PRIMITIVES (SVG)
 * Drawn in local coordinate space [-70, 70] so they can be scaled, rotated, paired, and fused inside any archetype
 */
function renderVisualPrimitiveSvg(
  primitive: LogoVisualPrimitive,
  primaryHex: string,
  secondaryHex: string,
  accentHex: string,
  gradId: string,
  isDarkSurface: boolean
): React.ReactNode {
  const strokeTone = isDarkSurface ? '#FFFFFF' : '#0F172A';
  const fillLight = isDarkSurface ? '#1E293B' : '#FFFFFF';

  switch (primitive) {
    case 'sports_car':
      return (
        <g>
          {/* Aerodynamic Supercar Body */}
          <path
            d="M-66,12 C-54,-8 -30,-24 -4,-26 C22,-28 44,-12 64,2 C72,8 74,16 68,22 L-64,22 C-70,22 -70,16 -66,12 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          {/* Cockpit Canopy */}
          <path
            d="M-28,-6 C-14,-18 12,-18 28,-6 L14,4 L-22,4 Z"
            fill={fillLight}
            stroke={accentHex}
            strokeWidth="2.5"
          />
          {/* Alloy Wheels */}
          {[-38, 38].map((wx) => (
            <g key={wx} transform={`translate(${wx}, 22)`}>
              <circle cx="0" cy="0" r="16" fill="#0F172A" stroke={accentHex} strokeWidth="3" />
              <circle cx="0" cy="0" r="6" fill={primaryHex} />
            </g>
          ))}
        </g>
      );

    case 'wheel_speed':
      return (
        <g>
          <circle cx="0" cy="0" r="46" fill="none" stroke={`url(#${gradId})`} strokeWidth="8" strokeDasharray="22 8" />
          <circle cx="0" cy="0" r="32" fill={fillLight} stroke={strokeTone} strokeWidth="3.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos((deg * Math.PI) / 180) * 30}
              y2={Math.sin((deg * Math.PI) / 180) * 30}
              stroke={accentHex}
              strokeWidth="3.5"
            />
          ))}
          <circle cx="0" cy="0" r="11" fill={`url(#${gradId})`} stroke={strokeTone} strokeWidth="2.5" />
        </g>
      );

    case 'phone_mobile':
      return (
        <g>
          <rect
            x="-28"
            y="-50"
            width="56"
            height="100"
            rx="14"
            fill={fillLight}
            stroke={strokeTone}
            strokeWidth="4"
          />
          <rect x="-20" y="-36" width="40" height="68" rx="6" fill={`url(#${gradId})`} opacity="0.9" />
          <line x1="-8" y1="-43" x2="8" y2="-43" stroke={accentHex} strokeWidth="3" strokeLinecap="round" />
          {/* Touch Spark / UI Bar on Screen */}
          <path d="M-10,4 L-2,12 L14,-8" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="0" cy="41" r="3.5" fill={accentHex} />
        </g>
      );

    case 'shop_cart':
      return (
        <g>
          {/* Modern Shopping Bag + Awning */}
          <path
            d="M-36,-14 L36,-14 L44,44 C44,50 38,54 32,54 L-32,54 C-38,54 -44,50 -44,44 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <path
            d="M-18,-14 C-18,-38 18,-38 18,-14"
            fill="none"
            stroke={accentHex}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="-16" cy="4" r="4" fill="#FFFFFF" />
          <circle cx="16" cy="4" r="4" fill="#FFFFFF" />
          <path d="M-14,22 Q0,34 14,22" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );

    case 'chart_growth':
      return (
        <g>
          <rect x="-42" y="10" width="16" height="34" rx="5" fill={secondaryHex} />
          <rect x="-16" y="-8" width="16" height="52" rx="5" fill={primaryHex} />
          <rect x="10" y="-28" width="16" height="72" rx="5" fill={`url(#${gradId})`} />
          <path
            d="M-44,2 L-10,-22 L18,-42 L42,-46"
            fill="none"
            stroke={accentHex}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="46,-50 32,-52 40,-36" fill={accentHex} />
        </g>
      );

    case 'lightning_fast':
      return (
        <g>
          <polygon
            points="8,-56 -32,4 -4,4 -14,56 34,-8 4,-8"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'flame_hot':
      return (
        <g>
          <path
            d="M0,-58 C24,-28 44,-4 40,24 C36,46 18,56 0,56 C-20,56 -40,42 -40,18 C-40,-4 -24,-18 -14,-30 C-12,-14 -4,-10 0,-58 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <path
            d="M2,-16 C14,2 20,16 16,32 C12,44 -8,44 -14,30 C-18,16 -8,2 2,-16 Z"
            fill={accentHex}
          />
        </g>
      );

    case 'leaf_organic':
      return (
        <g>
          <path
            d="M-38,38 C-42,-14 -4,-48 46,-46 C44,4 12,42 -38,38 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <path
            d="M-38,38 Q4,2 34,-34"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M-8,10 L-22,-8 M8,-6 L-6,-22" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );

    case 'droplet_pure':
      return (
        <g>
          <path
            d="M0,-54 C24,-18 40,6 40,26 A40,40 0 1,1 -40,26 C-40,6 -24,-18 0,-54 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <path
            d="M-16,16 C-18,28 -8,38 4,38"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="14" cy="-12" r="5" fill={accentHex} />
        </g>
      );

    case 'coffee_mug':
      return (
        <g>
          <path
            d="M-36,-10 L26,-10 L20,34 C18,46 6,52 -5,52 C-16,52 -28,46 -30,34 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <path
            d="M24,-2 C42,-2 42,24 22,24"
            fill="none"
            stroke={accentHex}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M-16,-22 Q-24,-36 -12,-48 M4,-20 Q-4,-34 8,-46" fill="none" stroke={accentHex} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );

    case 'bakery_food':
      return (
        <g>
          {/* Gourmet Chef Toque + Cloche Dome */}
          <path
            d="M-34,4 C-52,-4 -46,-36 -20,-34 C-12,-54 12,-54 20,-34 C46,-36 52,-4 34,4 L28,32 L-28,32 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <rect x="-30" y="32" width="60" height="12" rx="4" fill={accentHex} />
        </g>
      );

    case 'camera_lens':
      return (
        <g>
          <circle cx="0" cy="0" r="46" fill={fillLight} stroke={strokeTone} strokeWidth="4" />
          <circle cx="0" cy="0" r="34" fill={`url(#${gradId})`} />
          {/* Aperture Blades */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1={Math.cos((deg * Math.PI) / 180) * 14}
              y1={Math.sin((deg * Math.PI) / 180) * 14}
              x2={Math.cos(((deg + 45) * Math.PI) / 180) * 34}
              y2={Math.sin(((deg + 45) * Math.PI) / 180) * 34}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          ))}
          <circle cx="0" cy="0" r="13" fill="#0F172A" stroke={accentHex} strokeWidth="3" />
          <circle cx="-5" cy="-5" r="4" fill="#FFFFFF" />
        </g>
      );

    case 'sound_stage':
      return (
        <g>
          {[
            { x: -36, h: 28 },
            { x: -18, h: 56 },
            { x: 0, h: 86 },
            { x: 18, h: 60 },
            { x: 36, h: 32 },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x - 5}
              y={-b.h / 2}
              width="10"
              height={b.h}
              rx="5"
              fill={i === 2 ? accentHex : `url(#${gradId})`}
            />
          ))}
        </g>
      );

    case 'dress_fashion':
      return (
        <g>
          {/* Couture Atelier Hanger & Flowing Silk */}
          <path
            d="M0,-28 C0,-40 12,-42 12,-32 C12,-24 0,-20 0,-12 M-52,16 L0,-12 L52,16 C56,20 52,26 44,26 L-44,26 C-52,26 -56,20 -52,16 Z"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-32,26 L-44,54 L44,54 L32,26 Z"
            fill={`url(#${gradId})`}
            opacity="0.85"
          />
        </g>
      );

    case 'gem_luxury':
      return (
        <g>
          <polygon
            points="-28,-42 28,-42 52,-12 0,52 -52,-12"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polyline
            points="-52,-12 52,-12 M-28,-42 -14,-12 0,52 14,-12 28,-42"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </g>
      );

    case 'lotus_spa':
      return (
        <g>
          <path
            d="M0,-48 C20,-18 22,14 0,34 C-22,14 -20,-18 0,-48 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <path
            d="M0,34 C24,24 46,2 42,-22 C22,-12 12,8 0,34 Z"
            fill={secondaryHex}
            opacity="0.85"
          />
          <path
            d="M0,34 C-24,24 -46,2 -42,-22 C-22,-12 -12,8 0,34 Z"
            fill={primaryHex}
            opacity="0.85"
          />
          <circle cx="0" cy="-58" r="5" fill={accentHex} />
        </g>
      );

    case 'tooth_dental':
      return (
        <g>
          <path
            d="M-32,-34 C-16,-46 0,-34 0,-34 C0,-34 16,-46 32,-34 C46,-22 42,6 30,26 C22,42 18,52 10,48 C4,44 4,22 0,22 C-4,22 -4,44 -10,48 C-18,52 -22,42 -30,26 C-42,6 -46,-22 -32,-34 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <path d="M-16,-10 Q0,4 16,-10" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </g>
      );

    case 'heart_care':
      return (
        <g>
          <path
            d="M0,46 C-48,14 -56,-22 -32,-40 C-14,-52 0,-34 0,-24 C0,-34 14,-52 32,-40 C56,-22 48,14 0,46 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <polyline
            points="-26,2 -10,2 -4,-14 6,16 14,2 28,2"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'paw_pet':
      return (
        <g>
          <path
            d="M0,-6 C22,-6 32,14 26,30 C22,40 10,36 0,36 C-10,36 -22,40 -26,30 C-32,14 -22,-6 0,-6 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <ellipse cx="-32" cy="-16" rx="10" ry="14" transform="rotate(-20 -32 -16)" fill={primaryHex} />
          <ellipse cx="-12" cy="-34" rx="10" ry="15" transform="rotate(-8 -12 -34)" fill={secondaryHex} />
          <ellipse cx="12" cy="-34" rx="10" ry="15" transform="rotate(8 12 -34)" fill={secondaryHex} />
          <ellipse cx="32" cy="-16" rx="10" ry="14" transform="rotate(20 32 -16)" fill={primaryHex} />
        </g>
      );

    case 'building_arch':
      return (
        <g>
          <polygon
            points="-36,46 -36,-24 -8,-48 -8,46"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <polygon
            points="-4,46 -4,-36 32,-16 32,46"
            fill={secondaryHex}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <line x1="-48" y1="46" x2="48" y2="46" stroke={accentHex} strokeWidth="5" strokeLinecap="round" />
        </g>
      );

    case 'airplane_globe':
      return (
        <g>
          <circle cx="0" cy="4" r="38" fill="none" stroke={secondaryHex} strokeWidth="3" strokeDasharray="8 6" />
          <path
            d="M-46,16 L46,-26 L12,34 L-4,12 L-26,22 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'book_grad':
      return (
        <g>
          <path
            d="M0,-16 C-18,-28 -44,-26 -54,-12 L-54,32 C-40,20 -18,22 0,36 C18,22 40,20 54,32 L54,-12 C44,-26 18,-28 0,-16 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <polygon points="0,-52 -42,-32 0,-14 42,-32" fill={accentHex} stroke={strokeTone} strokeWidth="2.5" />
        </g>
      );

    case 'shield_trust':
      return (
        <g>
          <path
            d="M0,-52 L44,-32 L38,12 C32,38 0,54 0,54 C0,54 -32,38 -38,12 L-44,-32 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
          />
          <polyline
            points="-16,2 -4,14 20,-12"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'sun_horizon':
      return (
        <g>
          <circle cx="0" cy="0" r="32" fill={`url(#${gradId})`} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={Math.cos((deg * Math.PI) / 180) * 38}
              y1={Math.sin((deg * Math.PI) / 180) * 38}
              x2={Math.cos((deg * Math.PI) / 180) * 52}
              y2={Math.sin((deg * Math.PI) / 180) * 52}
              stroke={accentHex}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
        </g>
      );

    case 'star_crown':
      return (
        <g>
          <polygon
            points="-44,30 -52,-20 -20,4 0,-38 20,4 52,-20 44,30"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="-46" r="5" fill={accentHex} />
        </g>
      );

    case 'gift_box':
      return (
        <g>
          <rect x="-36" y="-12" width="72" height="58" rx="8" fill={`url(#${gradId})`} stroke={strokeTone} strokeWidth="3.5" />
          <line x1="0" y1="-12" x2="0" y2="46" stroke={accentHex} strokeWidth="8" />
          <line x1="-36" y1="14" x2="36" y2="14" stroke={accentHex} strokeWidth="8" />
          <path d="M0,-12 C-24,-36 -36,-12 0,-12 C36,-12 24,-36 0,-12 Z" fill="none" stroke={accentHex} strokeWidth="5" />
        </g>
      );

    case 'clock_247':
      return (
        <g>
          <circle cx="0" cy="0" r="44" fill={fillLight} stroke={`url(#${gradId})`} strokeWidth="6" />
          <polyline points="0,-24 0,4 20,14" fill="none" stroke={strokeTone} strokeWidth="5" strokeLinecap="round" />
        </g>
      );

    case 'ai_spark':
    default:
      return (
        <g>
          <path
            d="M0,-54 Q8,-8 54,0 Q8,8 0,54 Q-8,8 -54,0 Q-8,-8 0,-54 Z"
            fill={`url(#${gradId})`}
            stroke={strokeTone}
            strokeWidth="3"
          />
          <circle cx="32" cy="-32" r="7" fill={accentHex} />
          <circle cx="-32" cy="32" r="5" fill={secondaryHex} />
        </g>
      );
  }
}

/**
 * USP EFFECT VISUAL MODIFIER LAYER (SVG)
 * Reflects "Có gì đặc biệt?" directly around the artwork
 */
function renderUspEffectLayerSvg(
  effect: LogoUspEffect,
  primaryHex: string,
  secondaryHex: string,
  accentHex: string
): React.ReactNode {
  switch (effect) {
    case 'speed_trails':
      return (
        <g opacity="0.75">
          <path d="M-125,-32 L-65,-32" stroke={accentHex} strokeWidth="4" strokeLinecap="round" />
          <path d="M-135,4 L-85,4" stroke={primaryHex} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M75,28 L130,28" stroke={secondaryHex} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case 'organic_halo':
      return (
        <g opacity="0.6">
          <circle cx="0" cy="0" r="102" fill="none" stroke={primaryHex} strokeWidth="2" strokeDasharray="14 8" />
          <path d="M-92,-48 C-78,-68 -56,-56 -72,-36 Z" fill={accentHex} />
          <path d="M88,42 C74,62 52,50 68,30 Z" fill={secondaryHex} />
        </g>
      );
    case 'sparkle_stars':
      return (
        <g>
          {[
            { x: -92, y: -68, s: 1 },
            { x: 96, y: -54, s: 0.85 },
            { x: 84, y: 68, s: 0.7 },
          ].map((st, idx) => (
            <path
              key={idx}
              transform={`translate(${st.x}, ${st.y}) scale(${st.s})`}
              d="M0,-14 Q2,-2 14,0 Q2,2 0,14 Q-2,2 -14,0 Q-2,-2 0,-14 Z"
              fill={accentHex}
            />
          ))}
        </g>
      );
    case 'sound_waves':
      return (
        <g fill="none" stroke={accentHex} strokeWidth="2.5" strokeLinecap="round" opacity="0.65">
          <path d="M-96,-44 A108,108 0 0,0 -96,44" />
          <path d="M-114,-62 A128,128 0 0,0 -114,62" />
          <path d="M96,-44 A108,108 0 0,1 96,44" />
          <path d="M114,-62 A128,128 0 0,1 114,62" />
        </g>
      );
    case 'precision_grid':
      return (
        <g opacity="0.35" stroke={primaryHex} strokeWidth="1.5">
          <circle cx="0" cy="0" r="96" fill="none" />
          <line x1="-112" y1="0" x2="112" y2="0" strokeDasharray="4 4" />
          <line x1="0" y1="-112" x2="0" y2="112" strokeDasharray="4 4" />
        </g>
      );
    case 'sunburst_rays':
      return (
        <g opacity="0.45">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1={Math.cos((deg * Math.PI) / 180) * 86}
              y1={Math.sin((deg * Math.PI) / 180) * 86}
              x2={Math.cos((deg * Math.PI) / 180) * 106}
              y2={Math.sin((deg * Math.PI) / 180) * 106}
              stroke={accentHex}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </g>
      );
    case 'shield_aura':
      return (
        <path
          d="M0,-104 L88,-64 L76,24 C64,76 0,108 0,108 C0,108 -64,76 -76,24 L-88,-64 Z"
          fill="none"
          stroke={accentHex}
          strokeWidth="2.5"
          strokeDasharray="10 6"
          opacity="0.6"
        />
      );
    case 'orbital_rings':
    default:
      return (
        <g opacity="0.65">
          <ellipse
            cx="0"
            cy="0"
            rx="108"
            ry="42"
            transform="rotate(-24)"
            fill="none"
            stroke={accentHex}
            strokeWidth="2.5"
          />
          <circle cx="88" cy="-38" r="6" fill={primaryHex} />
          <circle cx="-88" cy="38" r="5" fill={secondaryHex} />
        </g>
      );
  }
}

function truncateWords(text: string, maxChars: number): string {
  const clean = text.trim();
  if (clean.length <= maxChars) return clean;
  const words = clean.split(/\s+/);
  let out = '';
  for (const w of words) {
    if ((out ? `${out} ${w}` : w).length > maxChars) break;
    out = out ? `${out} ${w}` : w;
  }
  return out || clean.slice(0, maxChars);
}

/**
 * 8 COMPLETELY DISTINCT, NON-TEMPLATED CREATIVE LOGO COMPOSITIONS (SVG 512x512)
 * Zero fixed outer boxes or shields — every archetype creates a unique layout, background, and multi-icon fusion!
 */
function renderCreativeArchetypeSvg(
  concept: BrandLogoConcept,
  artSpec: LogoArtDirectionSpec,
  brandName: string,
  domainName: string,
  activeSeed: number
): React.ReactNode {
  const gradId = `creativeGrad_${concept.variantNumber}_${activeSeed}`;
  const subGradId = `creativeSubGrad_${concept.variantNumber}_${activeSeed}`;
  const glowId = `creativeGlow_${concept.variantNumber}_${activeSeed}`;
  const arcPathIdTop = `arcTop_${concept.variantNumber}_${activeSeed}`;
  const arcPathIdBot = `arcBot_${concept.variantNumber}_${activeSeed}`;

  const svgFont =
    artSpec.fontStyle === 'serif_luxury'
      ? 'Georgia, serif'
      : 'Plus Jakarta Sans, sans-serif';

  const words = brandName.trim().split(/\s+/);
  const line1 =
    words.length >= 2
      ? words.slice(0, Math.ceil(words.length / 2)).join(' ')
      : truncateWords(brandName, 14);
  const line2 =
    words.length >= 2
      ? words.slice(Math.ceil(words.length / 2)).join(' ')
      : truncateWords(artSpec.whatTheySellLabel.split('+')[0]?.trim() || '', 16);

  const isDark =
    concept.variantNumber === '02' ||
    artSpec.archetype === 'orbital_constellation' ||
    artSpec.archetype === 'isometric_prism';

  const bgFill = isDark ? '#0B1120' : '#F8FAFC';
  const textMain = isDark ? '#FFFFFF' : '#0F172A';
  const textSub = isDark ? '#CBD5E1' : '#475569';

  return (
    <>
      <defs>
        <linearGradient
          id={gradId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform={`rotate(${artSpec.gradientAngle} 0.5 0.5)`}
        >
          <stop offset="0%" stopColor={artSpec.primaryHex} />
          <stop offset="100%" stopColor={artSpec.secondaryHex} />
        </linearGradient>
        <linearGradient id={subGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={artSpec.secondaryHex} />
          <stop offset="100%" stopColor={artSpec.accentHex} />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={artSpec.primaryHex} stopOpacity={isDark ? '0.28' : '0.14'} />
          <stop offset="100%" stopColor={bgFill} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base Canvas */}
      <rect width="512" height="512" rx="36" fill={bgFill} />
      <circle cx="256" cy="220" r="240" fill={`url(#${glowId})`} />

      {(() => {
        switch (artSpec.archetype) {
          // ===================================================================
          // ARCHETYPE 1: FUSION MONOGRAM (Chữ Cái Độc Bản Lồng Ghép Sản Phẩm)
          // ===================================================================
          case 'fusion_monogram':
            return (
              <g>
                {/* Soft Artistic Backdrop Rings */}
                <circle
                  cx="256"
                  cy="196"
                  r="134"
                  fill={artSpec.primaryHex}
                  opacity={isDark ? '0.12' : '0.07'}
                />
                <g transform="translate(256, 196)">
                  {renderUspEffectLayerSvg(
                    artSpec.uspEffect,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex
                  )}
                </g>

                {/* Giant Sculpted Initial Letterform in Background */}
                <text
                  x="206"
                  y="258"
                  textAnchor="middle"
                  fill={`url(#${gradId})`}
                  opacity={isDark ? '0.26' : '0.18'}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="210"
                >
                  {concept.monogramText[0] || 'X'}
                </text>

                {/* Primary Product Object Fused at Center */}
                <g transform="translate(256, 188) scale(1.22)">
                  {renderVisualPrimitiveSvg(
                    artSpec.primaryPrimitive,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex,
                    gradId,
                    isDark
                  )}
                </g>

                {/* Secondary Product Object Floating in Golden-Ratio Satellite */}
                <g transform="translate(352, 114) scale(0.55)">
                  <circle
                    cx="0"
                    cy="0"
                    r="62"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={artSpec.accentHex}
                    strokeWidth="4"
                  />
                  {renderVisualPrimitiveSvg(
                    artSpec.secondaryPrimitive,
                    artSpec.secondaryHex,
                    artSpec.primaryHex,
                    artSpec.accentHex,
                    subGradId,
                    isDark
                  )}
                </g>

                {/* Free-Standing Editorial Brand Name & USP Subtitle */}
                <text
                  x="256"
                  y="386"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="36"
                  letterSpacing="-0.5"
                >
                  {truncateWords(brandName, 22)}
                </text>
                <text
                  x="256"
                  y="422"
                  textAnchor="middle"
                  fill={artSpec.primaryHex}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                  fontSize="13"
                  letterSpacing="1.8"
                >
                  {truncateWords(artSpec.whatTheySellLabel, 36).toUpperCase()}
                </text>
                <text
                  x="256"
                  y="452"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  fontSize="12"
                >
                  {domainName} · {truncateWords(artSpec.whoTheyServeLabel, 24)}
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 2: KINETIC HORIZON (Dải Chuyển Động Khí Động Học)
          // ===================================================================
          case 'kinetic_horizon':
            return (
              <g>
                {/* Sweeping Velocity Wave Underpinning the Composition */}
                <path
                  d="M-20,350 C140,290 320,390 532,290 L532,512 L-20,512 Z"
                  fill={`url(#${gradId})`}
                  opacity={isDark ? '0.18' : '0.1'}
                />
                <path
                  d="M44,328 Q256,282 468,318"
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Asymmetric Kinetic Portal on Left-Top */}
                <g transform="translate(154, 198)">
                  {renderUspEffectLayerSvg(
                    artSpec.uspEffect,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex
                  )}
                  <g transform="scale(1.18)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>
                </g>

                {/* Secondary Product Mark Above Wave */}
                <g transform="translate(242, 118) scale(0.56)">
                  {renderVisualPrimitiveSvg(
                    artSpec.secondaryPrimitive,
                    artSpec.secondaryHex,
                    artSpec.accentHex,
                    artSpec.primaryHex,
                    subGradId,
                    isDark
                  )}
                </g>

                {/* Right-Aligned Dynamic Brand Typography */}
                <text
                  x="276"
                  y="204"
                  textAnchor="start"
                  fill={textMain}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="38"
                >
                  {truncateWords(line1, 12)}
                </text>
                <text
                  x="276"
                  y="248"
                  textAnchor="start"
                  fill={`url(#${gradId})`}
                  fontFamily={svgFont}
                  fontWeight="800"
                  fontSize="28"
                >
                  {truncateWords(line2, 14).toUpperCase()}
                </text>

                {/* Bottom Creative Story Strip */}
                <text
                  x="256"
                  y="402"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                  fontSize="14"
                >
                  {truncateWords(artSpec.whatIsSpecialLabel, 42)}
                </text>
                <text
                  x="256"
                  y="436"
                  textAnchor="middle"
                  fill={artSpec.primaryHex}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fontSize="13"
                  letterSpacing="1.5"
                >
                  {domainName.toUpperCase()}
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 3: ORBITAL CONSTELLATION (Hệ Sinh Thái Đa Biểu Tượng)
          // ===================================================================
          case 'orbital_constellation':
            return (
              <g>
                {/* Dual Tilted Planetary Orbits */}
                <g transform="translate(256, 200)">
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="154"
                    ry="62"
                    transform="rotate(-22)"
                    fill="none"
                    stroke={artSpec.primaryHex}
                    strokeWidth="2.5"
                    strokeDasharray="10 6"
                  />
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="154"
                    ry="62"
                    transform="rotate(26)"
                    fill="none"
                    stroke={artSpec.accentHex}
                    strokeWidth="2"
                    opacity="0.7"
                  />

                  {/* Center Glowing Core */}
                  <circle
                    cx="0"
                    cy="0"
                    r="76"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={`url(#${gradId})`}
                    strokeWidth="4"
                  />
                  <g transform="scale(1.05)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>

                  {/* Orbiting Secondary Product Node */}
                  <g transform="translate(122, -48) scale(0.5)">
                    <circle cx="0" cy="0" r="56" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={artSpec.accentHex} strokeWidth="4" />
                    {renderVisualPrimitiveSvg(
                      artSpec.secondaryPrimitive,
                      artSpec.secondaryHex,
                      artSpec.primaryHex,
                      artSpec.accentHex,
                      subGradId,
                      isDark
                    )}
                  </g>

                  {/* Orbiting Monogram Node */}
                  <g transform="translate(-124, 44)">
                    <circle cx="0" cy="0" r="24" fill={`url(#${gradId})`} />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="800"
                      fontSize="15"
                    >
                      {concept.monogramText}
                    </text>
                  </g>
                </g>

                {/* Centered Constellation Typography */}
                <text
                  x="256"
                  y="378"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="34"
                  letterSpacing="1"
                >
                  {truncateWords(brandName, 22).toUpperCase()}
                </text>
                <text
                  x="256"
                  y="412"
                  textAnchor="middle"
                  fill={artSpec.accentHex}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                  fontSize="13"
                  letterSpacing="2"
                >
                  {truncateWords(artSpec.whatTheySellLabel, 38).toUpperCase()}
                </text>
                <text
                  x="256"
                  y="444"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  fontSize="12"
                >
                  ★ {domainName.toUpperCase()} · {truncateWords(artSpec.whoTheyServeLabel, 22)} ★
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 4: EDITORIAL ATELIER (Nghệ Thuật Đường Nét Tinh Hoa)
          // ===================================================================
          case 'editorial_atelier':
            return (
              <g>
                {/* Rotated Fine-Line Diamond & Golden Ratio Arch */}
                <g transform="translate(256, 194)">
                  <rect
                    x="-92"
                    y="-92"
                    width="184"
                    height="184"
                    rx="24"
                    transform="rotate(45)"
                    fill="none"
                    stroke={artSpec.primaryHex}
                    strokeWidth="2"
                    opacity="0.45"
                  />
                  <path
                    d="M-76,72 L-76,-12 A76,76 0 0,1 76,-12 L76,72 Z"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={`url(#${gradId})`}
                    strokeWidth="3.5"
                  />
                  <g transform="translate(0, -6) scale(1.02)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>
                  <g transform="translate(0, 56) scale(0.42)">
                    {renderVisualPrimitiveSvg(
                      artSpec.secondaryPrimitive,
                      artSpec.secondaryHex,
                      artSpec.primaryHex,
                      artSpec.accentHex,
                      subGradId,
                      isDark
                    )}
                  </g>
                </g>

                {/* Editorial Serif / Sans Wordmark */}
                <text
                  x="256"
                  y="376"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                  fontSize="36"
                  letterSpacing="2"
                >
                  {truncateWords(brandName, 22)}
                </text>
                <line
                  x1="176"
                  y1="396"
                  x2="336"
                  y2="396"
                  stroke={artSpec.accentHex}
                  strokeWidth="2"
                />
                <text
                  x="256"
                  y="424"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="600"
                  fontSize="12"
                  letterSpacing="2.5"
                >
                  {truncateWords(artSpec.whatIsSpecialLabel, 38).toUpperCase()}
                </text>
                <text
                  x="256"
                  y="452"
                  textAnchor="middle"
                  fill={artSpec.primaryHex}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fontSize="12"
                >
                  {domainName}
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 5: ORGANIC BLOOM (Khối Hữu Cơ Mềm Mại & Thân Thiện)
          // ===================================================================
          case 'organic_bloom':
            return (
              <g>
                {/* Morphing Organic Fluid Shapes */}
                <g transform="translate(256, 198)">
                  <path
                    d="M-112,-42 C-88,-118 28,-132 96,-74 C148,-28 134,76 68,112 C-4,148 -118,112 -128,32 C-134,-4 -124,-12 -112,-42 Z"
                    fill={`url(#${gradId})`}
                    opacity="0.16"
                  />
                  <path
                    d="M-84,-68 C-22,-116 86,-88 104,-14 C122,58 54,116 -24,104 C-96,92 -126,-26 -84,-68 Z"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={`url(#${gradId})`}
                    strokeWidth="4"
                  />
                  {renderUspEffectLayerSvg(
                    artSpec.uspEffect,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex
                  )}
                  <g transform="translate(-18, 0) scale(1.08)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>
                  <g transform="translate(56, -34) scale(0.55)">
                    {renderVisualPrimitiveSvg(
                      artSpec.secondaryPrimitive,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      artSpec.primaryHex,
                      subGradId,
                      isDark
                    )}
                  </g>
                </g>

                <text
                  x="256"
                  y="382"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="800"
                  fontSize="36"
                >
                  {truncateWords(brandName, 22)}
                </text>
                <text
                  x="256"
                  y="416"
                  textAnchor="middle"
                  fill={artSpec.primaryHex}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                  fontSize="14"
                >
                  {truncateWords(artSpec.whatTheySellLabel, 24)} · {truncateWords(artSpec.whoTheyServeLabel, 20)}
                </text>
                <text
                  x="256"
                  y="446"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fontSize="12"
                >
                  {domainName}
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 6: BAUHAUS MODULAR (Hình Học Sáng Tạo Bauhaus)
          // ===================================================================
          case 'bauhaus_modular':
            return (
              <g>
                {/* Interlocking Bauhaus Geometric Blocks (No standard card frame) */}
                <g transform="translate(76, 68)">
                  {/* Quarter Circle Block 1 */}
                  <path
                    d="M0,0 L160,0 A160,160 0 0,1 0,160 Z"
                    fill={`url(#${gradId})`}
                  />
                  {/* Pill Block 2 */}
                  <rect
                    x="176"
                    y="0"
                    width="184"
                    height="160"
                    rx="80"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={artSpec.primaryHex}
                    strokeWidth="4"
                  />
                  {/* Primary Icon Inside Pill */}
                  <g transform="translate(268, 80) scale(0.95)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>

                  {/* Bottom Left Circle with Secondary Icon */}
                  <circle
                    cx="80"
                    cy="228"
                    r="56"
                    fill={artSpec.accentHex}
                    opacity="0.22"
                  />
                  <g transform="translate(80, 228) scale(0.75)">
                    {renderVisualPrimitiveSvg(
                      artSpec.secondaryPrimitive,
                      artSpec.secondaryHex,
                      artSpec.primaryHex,
                      artSpec.accentHex,
                      subGradId,
                      isDark
                    )}
                  </g>

                  {/* Monogram in Top-Left Quarter Circle */}
                  <text
                    x="56"
                    y="76"
                    fill="#FFFFFF"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="900"
                    fontSize="44"
                  >
                    {concept.monogramText}
                  </text>

                  {/* Bottom-Right Bauhaus Typography Stack */}
                  <text
                    x="160"
                    y="218"
                    fill={textMain}
                    fontFamily={svgFont}
                    fontWeight="900"
                    fontSize="34"
                  >
                    {truncateWords(line1, 13)}
                  </text>
                  <text
                    x="160"
                    y="256"
                    fill={artSpec.primaryHex}
                    fontFamily={svgFont}
                    fontWeight="800"
                    fontSize="24"
                  >
                    {truncateWords(line2, 16).toUpperCase()}
                  </text>
                  <text
                    x="160"
                    y="286"
                    fill={textSub}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                    fontSize="13"
                  >
                    {domainName.toUpperCase()}
                  </text>
                </g>

                {/* Footer USP Caption */}
                <text
                  x="256"
                  y="442"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="600"
                  fontSize="13"
                >
                  {truncateWords(artSpec.whatIsSpecialLabel, 48)}
                </text>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 7: CIRCULAR STAMP (Ấn Chương Nghệ Thuật Vòng Cung)
          // ===================================================================
          case 'circular_stamp':
            return (
              <g>
                <defs>
                  <path
                    id={arcPathIdTop}
                    d="M 92,256 A 164,164 0 1,1 420,256"
                  />
                  <path
                    id={arcPathIdBot}
                    d="M 420,256 A 164,164 0 1,1 92,256"
                  />
                </defs>

                {/* Outer Scalloped / Double Seal Ring */}
                <circle
                  cx="256"
                  cy="256"
                  r="196"
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth="4"
                />
                <circle
                  cx="256"
                  cy="256"
                  r="132"
                  fill={isDark ? '#1E293B' : '#FFFFFF'}
                  stroke={artSpec.accentHex}
                  strokeWidth="3"
                  strokeDasharray="10 5"
                />

                {/* Curved Brand Name on Top Arc */}
                <text
                  fill={textMain}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="24"
                  letterSpacing="3"
                >
                  <textPath
                    href={`#${arcPathIdTop}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    ★ {truncateWords(brandName, 20).toUpperCase()} ★
                  </textPath>
                </text>

                {/* Curved Domain & Product USP on Bottom Arc */}
                <text
                  fill={artSpec.primaryHex}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fontSize="14"
                  letterSpacing="2"
                >
                  <textPath
                    href={`#${arcPathIdBot}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {domainName.toUpperCase()} · {truncateWords(artSpec.whatTheySellLabel, 18).toUpperCase()}
                  </textPath>
                </text>

                {/* Center Dual-Icon Artwork */}
                <g transform="translate(256, 246) scale(1.15)">
                  {renderVisualPrimitiveSvg(
                    artSpec.primaryPrimitive,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex,
                    gradId,
                    isDark
                  )}
                </g>
                <g transform="translate(324, 186) scale(0.48)">
                  {renderVisualPrimitiveSvg(
                    artSpec.secondaryPrimitive,
                    artSpec.secondaryHex,
                    artSpec.accentHex,
                    artSpec.primaryHex,
                    subGradId,
                    isDark
                  )}
                </g>
              </g>
            );

          // ===================================================================
          // ARCHETYPE 8: ISOMETRIC PRISM (Không Gian Lăng Kính Đa Chiều)
          // ===================================================================
          case 'isometric_prism':
          default:
            return (
              <g>
                {/* Floating Isometric 3D Diamond Platform */}
                <g transform="translate(256, 212)">
                  <polygon
                    points="0,-124 136,-46 0,32 -136,-46"
                    fill={`url(#${gradId})`}
                    opacity="0.22"
                  />
                  <polygon
                    points="0,42 136,-36 0,118 -136,-36"
                    fill={artSpec.secondaryHex}
                    opacity="0.35"
                  />
                  <polygon
                    points="0,-102 112,-38 0,26 -112,-38"
                    fill={isDark ? '#1E293B' : '#FFFFFF'}
                    stroke={artSpec.accentHex}
                    strokeWidth="3.5"
                  />

                  {renderUspEffectLayerSvg(
                    artSpec.uspEffect,
                    artSpec.primaryHex,
                    artSpec.secondaryHex,
                    artSpec.accentHex
                  )}

                  {/* Elevated Primary & Secondary Product Icons */}
                  <g transform="translate(-14, -42) scale(1.1)">
                    {renderVisualPrimitiveSvg(
                      artSpec.primaryPrimitive,
                      artSpec.primaryHex,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      gradId,
                      isDark
                    )}
                  </g>
                  <g transform="translate(68, -82) scale(0.54)">
                    {renderVisualPrimitiveSvg(
                      artSpec.secondaryPrimitive,
                      artSpec.secondaryHex,
                      artSpec.accentHex,
                      artSpec.primaryHex,
                      subGradId,
                      isDark
                    )}
                  </g>
                </g>

                <text
                  x="256"
                  y="382"
                  textAnchor="middle"
                  fill={textMain}
                  fontFamily={svgFont}
                  fontWeight="900"
                  fontSize="35"
                  letterSpacing="0.5"
                >
                  {truncateWords(brandName, 22)}
                </text>
                <text
                  x="256"
                  y="416"
                  textAnchor="middle"
                  fill={artSpec.accentHex}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                  fontSize="13"
                  letterSpacing="1.8"
                >
                  {truncateWords(artSpec.whatTheySellLabel, 38).toUpperCase()}
                </text>
                <text
                  x="256"
                  y="446"
                  textAnchor="middle"
                  fill={textSub}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  fontSize="12"
                >
                  {domainName} · {truncateWords(artSpec.whatIsSpecialLabel, 26)}
                </text>
              </g>
            );
        }
      })()}
    </>
  );
}

export const BrandLogoStudioSection: React.FC<BrandLogoStudioSectionProps> = ({
  brandName,
  domainName,
  brandDescription = '',
  logos,
  industry,
  onRegenerateLogos,
  auditVersion = 0,
}) => {
  const [localSeedBump, setLocalSeedBump] = useState<Record<string, number>>({
    'logo-minimal': 0,
    'logo-emblem': 0,
  });
  const [customArchetypes, setCustomArchetypes] = useState<
    Record<string, LogoCreativeArchetype | null>
  >({
    'logo-minimal': null,
    'logo-emblem': null,
  });
  const [renderMode, setRenderMode] = useState<
    Record<string, 'vector' | 'mockup_3d'>
  >({
    'logo-minimal': 'vector',
    'logo-emblem': 'vector',
  });
  const [aiDirectorOverride, setAiDirectorOverride] = useState<{
    whatTheySellLabel?: string;
    whoTheyServeLabel?: string;
    whatIsSpecialLabel?: string;
    primaryPrimitive?: LogoVisualPrimitive;
    secondaryPrimitive?: LogoVisualPrimitive;
    uspEffect?: LogoUspEffect;
    archetype01?: LogoCreativeArchetype;
    archetype02?: LogoCreativeArchetype;
    primaryHex?: string;
    secondaryHex?: string;
    accentHex?: string;
    fontStyle?: LogoArtDirectionSpec['fontStyle'];
    creativeNarrative01?: string;
    creativeNarrative02?: string;
  } | null>(null);
  const [isChoreographing, setIsChoreographing] = useState(false);

  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const logoSectionRef = useRef<HTMLElement | null>(null);

  // Call Server-Side Creative Logo Director (/api/ai-logo-director)
  const runAiArtDirectorStep = useCallback(
    async (seedVal: number, showOverlay: boolean) => {
      if (showOverlay) {
        setIsChoreographing(true);
      }

      let fetchedOverride: typeof aiDirectorOverride = null;

      try {
        const res = await fetch('/api/ai-logo-director', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandName,
            industryLabel: industry.label,
            brandDescription,
            seed: seedVal,
          }),
        });
        if (res.ok) {
          const json = (await res.json()) as {
            success?: boolean;
            data?: Record<string, unknown>;
          };
          if (json.success && json.data) {
            const d = json.data;
            fetchedOverride = {
              whatTheySellLabel:
                typeof d.whatTheySellLabel === 'string' && d.whatTheySellLabel.trim()
                  ? d.whatTheySellLabel.trim()
                  : undefined,
              whoTheyServeLabel:
                typeof d.whoTheyServeLabel === 'string' && d.whoTheyServeLabel.trim()
                  ? d.whoTheyServeLabel.trim()
                  : undefined,
              whatIsSpecialLabel:
                typeof d.whatIsSpecialLabel === 'string' && d.whatIsSpecialLabel.trim()
                  ? d.whatIsSpecialLabel.trim()
                  : undefined,
              primaryPrimitive: VALID_PRIMITIVES.has(
                d.primaryPrimitive as LogoVisualPrimitive
              )
                ? (d.primaryPrimitive as LogoVisualPrimitive)
                : undefined,
              secondaryPrimitive: VALID_PRIMITIVES.has(
                d.secondaryPrimitive as LogoVisualPrimitive
              )
                ? (d.secondaryPrimitive as LogoVisualPrimitive)
                : undefined,
              uspEffect: VALID_USP_EFFECTS.has(d.uspEffect as LogoUspEffect)
                ? (d.uspEffect as LogoUspEffect)
                : undefined,
              archetype01: VALID_ARCHETYPES.has(
                d.archetype01 as LogoCreativeArchetype
              )
                ? (d.archetype01 as LogoCreativeArchetype)
                : undefined,
              archetype02: VALID_ARCHETYPES.has(
                d.archetype02 as LogoCreativeArchetype
              )
                ? (d.archetype02 as LogoCreativeArchetype)
                : undefined,
              primaryHex: isValidHex(d.primaryHex) ? d.primaryHex : undefined,
              secondaryHex: isValidHex(d.secondaryHex) ? d.secondaryHex : undefined,
              accentHex: isValidHex(d.accentHex) ? d.accentHex : undefined,
              fontStyle:
                d.fontStyle === 'serif_luxury' ||
                d.fontStyle === 'sans_modern' ||
                d.fontStyle === 'geometric_tech'
                  ? d.fontStyle
                  : undefined,
              creativeNarrative01:
                typeof d.creativeNarrative01 === 'string' &&
                d.creativeNarrative01.trim()
                  ? d.creativeNarrative01.trim()
                  : undefined,
              creativeNarrative02:
                typeof d.creativeNarrative02 === 'string' &&
                d.creativeNarrative02.trim()
                  ? d.creativeNarrative02.trim()
                  : undefined,
            };
          }
        }
      } catch {
        // Fallback to local description deconstructor
      }

      if (fetchedOverride) {
        setAiDirectorOverride(fetchedOverride);
      }
      setIsChoreographing(false);
    },
    [brandName, industry.label, brandDescription]
  );

  useEffect(() => {
    setCustomArchetypes({ 'logo-minimal': null, 'logo-emblem': null });
    if (auditVersion > 0) {
      void runAiArtDirectorStep(logos[0].seed + auditVersion, true);
    }
  }, [auditVersion, logos, runAiArtDirectorStep]);

  const handleBumpSingleLogo = (id: string) => {
    const nextBump = (localSeedBump[id] || 0) + 1;
    setLocalSeedBump((prev) => ({ ...prev, [id]: nextBump }));
    // Cycle to the next creative archetype immediately
    const currentConcept = logos.find((l) => l.id === id) || logos[0];
    const currentArch =
      customArchetypes[id] || currentConcept.artDirection.archetype;
    const curIdx = ARCHETYPE_OPTIONS.findIndex((a) => a.id === currentArch);
    const nextArch =
      ARCHETYPE_OPTIONS[(curIdx + 1) % ARCHETYPE_OPTIONS.length].id;
    setCustomArchetypes((prev) => ({ ...prev, [id]: nextArch }));
  };

  const handleRegenerateBoth = () => {
    setCustomArchetypes({ 'logo-minimal': null, 'logo-emblem': null });
    onRegenerateLogos();
    void runAiArtDirectorStep(logos[0].seed + 37, true);
  };

  // Resolve effective Art Direction Spec for each concept
  const getEffectiveArtSpec = useCallback(
    (concept: BrandLogoConcept): LogoArtDirectionSpec => {
      const base = concept.artDirection;
      const isFirst = concept.variantNumber === '01';
      const manualArch = customArchetypes[concept.id];

      // Preserve deterministic local subject primitive if matched from explicit keywords
      const hasSpecificLocalPrimitive = base.primaryPrimitive !== 'ai_spark';

      const resolvedArchetype =
        manualArch ||
        (isFirst
          ? aiDirectorOverride?.archetype01 || base.archetype
          : aiDirectorOverride?.archetype02 || base.archetype);

      return {
        ...base,
        whatTheySellLabel:
          aiDirectorOverride?.whatTheySellLabel || base.whatTheySellLabel,
        whoTheyServeLabel:
          aiDirectorOverride?.whoTheyServeLabel || base.whoTheyServeLabel,
        whatIsSpecialLabel:
          aiDirectorOverride?.whatIsSpecialLabel || base.whatIsSpecialLabel,
        primaryPrimitive: hasSpecificLocalPrimitive
          ? base.primaryPrimitive
          : isFirst
          ? aiDirectorOverride?.primaryPrimitive || base.primaryPrimitive
          : aiDirectorOverride?.secondaryPrimitive || base.primaryPrimitive,
        secondaryPrimitive: hasSpecificLocalPrimitive
          ? base.secondaryPrimitive
          : isFirst
          ? aiDirectorOverride?.secondaryPrimitive || base.secondaryPrimitive
          : aiDirectorOverride?.primaryPrimitive || base.secondaryPrimitive,
        uspEffect: aiDirectorOverride?.uspEffect || base.uspEffect,
        archetype: resolvedArchetype,
        primaryHex: aiDirectorOverride?.primaryHex || base.primaryHex,
        secondaryHex: aiDirectorOverride?.secondaryHex || base.secondaryHex,
        accentHex: aiDirectorOverride?.accentHex || base.accentHex,
        fontStyle: aiDirectorOverride?.fontStyle || base.fontStyle,
        creativeNarrative: isFirst
          ? aiDirectorOverride?.creativeNarrative01 || base.creativeNarrative
          : aiDirectorOverride?.creativeNarrative02 || base.creativeNarrative,
      };
    },
    [aiDirectorOverride, customArchetypes]
  );

  // PHÂN CẢNH 5 (Part A): Curtain Clip-Path Unveil + Scale Zoom-Out on 02 Logo Cards
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!logoSectionRef.current) return;

      const logoCards = logoSectionRef.current.querySelectorAll<HTMLElement>(
        '.stage5-logo-card'
      );

      gsap.fromTo(
        logoCards,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          opacity: 0,
          y: 28,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          clearProps: 'clipPath,transform',
          scrollTrigger: {
            trigger: logoSectionRef.current,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, logoSectionRef);

    return () => ctx.revert();
  }, [auditVersion]);

  // Download high-resolution 1024x1024 PNG from the SVG element
  const handleDownloadPng = (concept: BrandLogoConcept) => {
    const svgElement = document.getElementById(`brand-svg-${concept.id}`);
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 1024, 1024);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${domainName.replace(/\./g, '-')}-${concept.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // Download pure scalable .SVG vector file
  const handleDownloadSvg = (concept: BrandLogoConcept) => {
    const svgElement = document.getElementById(`brand-svg-${concept.id}`);
    if (!svgElement) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${domainName.replace(/\./g, '-')}-${concept.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const primaryArtSpec = getEffectiveArtSpec(logos[0]);

  return (
    <section
      id="ai-logo-studio"
      ref={logoSectionRef}
      aria-label="Phân cảnh 5: 02 mẫu Logo sáng tạo linh hoạt theo mô tả thương hiệu"
      className="obsidian-card rounded-2xl p-4 sm:p-5"
    >
      {/* Header + Creative Regenerate CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              PHÂN CẢNH 05 / 05
            </span>
            <Palette className="h-4 w-4 text-indigo-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              02 Logo Sáng Tạo Độc Bản Theo Mô Tả Thương Hiệu & Sản Phẩm
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Tự động bóc tách <strong>Bán gì</strong>, <strong>Cho ai</strong> và <strong>Có gì đặc biệt</strong> từ ô miêu tả của bạn để kết hợp đa biểu tượng và bố cục riêng (không dùng khuôn mẫu cố định).
          </p>
        </div>

        <button
          type="button"
          onClick={handleRegenerateBoth}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isChoreographing ? 'animate-spin' : ''}`} />
          <span>Sáng tạo 2 bố cục & bảng màu mới</span>
        </button>
      </div>

      {/* Live Description Deconstruction Strip (Shows exact connection to "Bán gì, Cho ai, Có gì đặc biệt?") */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
        <div className="rounded-lg bg-white/90 px-3 py-2 border border-slate-200/80">
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            1. Bán gì (Biểu tượng kết hợp)
          </div>
          <div className="mt-0.5 text-xs font-bold text-slate-900">
            {primaryArtSpec.whatTheySellLabel}
          </div>
        </div>
        <div className="rounded-lg bg-white/90 px-3 py-2 border border-slate-200/80">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            2. Cho ai (Phong cách nét vẽ)
          </div>
          <div className="mt-0.5 text-xs font-bold text-slate-900">
            {primaryArtSpec.whoTheyServeLabel}
          </div>
        </div>
        <div className="rounded-lg bg-white/90 px-3 py-2 border border-slate-200/80">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
            3. Có gì đặc biệt (Hiệu ứng thị giác)
          </div>
          <div className="mt-0.5 text-xs font-bold text-slate-900">
            {primaryArtSpec.whatIsSpecialLabel}
          </div>
        </div>
      </div>

      {/* 02 Creative Non-Templated Logo Cards */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {logos.map((concept) => {
          const bump = localSeedBump[concept.id] || 0;
          const activeSeed = concept.seed + bump * 19;
          const mode = renderMode[concept.id] || 'vector';
          const artSpec = getEffectiveArtSpec(concept);
          const currentArchMeta =
            ARCHETYPE_OPTIONS.find((a) => a.id === artSpec.archetype) ||
            ARCHETYPE_OPTIONS[0];

          return (
            <div
              key={concept.id}
              data-archetype={artSpec.archetype}
              data-primitive={artSpec.primaryPrimitive}
              className="stage5-logo-card flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-sm will-change-transform"
            >
              {/* Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 font-mono text-xs font-bold text-white">
                    {concept.variantNumber}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Phương án {concept.variantNumber} · {currentArchMeta.fullTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <div
                    role="group"
                    aria-label={`Chế độ hiển thị Phương án ${concept.variantNumber}`}
                    className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setRenderMode((prev) => ({
                          ...prev,
                          [concept.id]: 'vector',
                        }))
                      }
                      className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                        mode === 'vector'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Layers className="inline h-3 w-3 mr-1" />
                       phẳng 2D
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRenderMode((prev) => ({
                          ...prev,
                          [concept.id]: 'mockup_3d',
                        }))
                      }
                      className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                        mode === 'mockup_3d'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="inline h-3 w-3 mr-1" />
                      Phối cảnh 3D
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBumpSingleLogo(concept.id)}
                    title="Đổi sang bố cục sáng tạo khác"
                    className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Wand2 className="h-3 w-3 text-indigo-600" />
                    <span>Đổi bố cục</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadSvg(concept)}
                    title="Tải file Vector SVG"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    <FileCode2 className="h-3 w-3 text-indigo-600" />
                    <span>SVG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadPng(concept)}
                    title="Tải ảnh Logo PNG (1024x1024)"
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="h-3 w-3" />
                    <span>Tải ảnh</span>
                  </button>
                </div>
              </div>

              {/* Quick 8-Archetype Selector Pills so User Can Freely Switch Creative Styles */}
              <div className="mt-2.5 flex items-center gap-1 overflow-x-auto pb-1">
                {ARCHETYPE_OPTIONS.map((arch) => {
                  const isActive = artSpec.archetype === arch.id;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() =>
                        setCustomArchetypes((prev) => ({
                          ...prev,
                          [concept.id]: arch.id,
                        }))
                      }
                      className={`rounded-lg px-2 py-1 text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-700'
                      }`}
                    >
                      {arch.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Central Creative Logo Stage */}
              <div className="mt-2.5 relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white h-80 sm:h-88 shadow-inner">
                {isChoreographing && (
                  <div className="pointer-events-none absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600" />
                    <span>AI đang phối màu & ý tưởng...</span>
                  </div>
                )}

                <div
                  ref={(el) => {
                    imgRefs.current[concept.id] = el as unknown as HTMLImageElement;
                  }}
                  className={`stage5-logo-stage-inner flex h-full w-full items-center justify-center p-3 transition-transform duration-500 ${
                    mode === 'mockup_3d'
                      ? 'bg-slate-900/95 [perspective:900px]'
                      : ''
                  }`}
                >
                  <div
                    className={`h-full w-full max-w-[360px] flex items-center justify-center transition-all duration-500 ${
                      mode === 'mockup_3d'
                        ? '[transform:rotateY(-14deg)_rotateX(8deg)_scale(0.94)] drop-shadow-[0_24px_36px_rgba(15,23,42,0.55)]'
                        : ''
                    }`}
                  >
                    <svg
                      id={`brand-svg-${concept.id}`}
                      viewBox="0 0 512 512"
                      className="h-full w-full rounded-2xl shadow-sm"
                      role="img"
                      aria-label={`Logo sáng tạo ${currentArchMeta.fullTitle} cho thương hiệu ${brandName}`}
                    >
                      {renderCreativeArchetypeSvg(
                        concept,
                        artSpec,
                        brandName,
                        domainName,
                        activeSeed
                      )}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Concise 1-line Description Connection Note */}
              <div className="mt-2.5 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-600">
                <strong className="text-slate-900">Liên kết với mô tả: </strong>
                {artSpec.creativeNarrative}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
