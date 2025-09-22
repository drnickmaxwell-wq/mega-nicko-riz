'use client'

import WaveBackground from "@/components/fx/WaveBackground";
        }
        
        .wave-background-medium {
          background: 
            radial-gradient(circle at 20% 80%, rgba(194, 24, 91, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(64, 196, 180, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
            linear-gradient(135deg, rgba(194, 24, 91, 0.02) 0%, rgba(64, 196, 180, 0.02) 50%, rgba(212, 175, 55, 0.02) 100%);
        }
        
        .wave-background-strong {
          background: 
            radial-gradient(circle at 20% 80%, rgba(194, 24, 91, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(64, 196, 180, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(194, 24, 91, 0.03) 0%, rgba(64, 196, 180, 0.03) 50%, rgba(212, 175, 55, 0.03) 100%);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wave-background-subtle,
          .wave-background-medium,
          .wave-background-strong {
            background: #F7F7F9;
          }
        }
      `}</style>
    </div>
  )
}

