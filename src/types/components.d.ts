declare module '@/components/footer' {
  import { FC } from 'react';
  const Footer: FC;
  export default Footer;
}

declare module '@/components/gradient-orb' {
  import { FC } from 'react';
  interface GradientOrbProps {
    color?: string;
    size?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    delay?: number;
    className?: string;
    animate?: boolean;
  }
  const GradientOrb: FC<GradientOrbProps>;
  export const PrimaryOrb: FC<Omit<GradientOrbProps, 'color'>>;
  export const AccentOrb: FC<Omit<GradientOrbProps, 'color'>>;
  export const SuccessOrb: FC<Omit<GradientOrbProps, 'color'>>;
  export default GradientOrb;
}

declare module '@/components/Testimonial' {
  import { FC } from 'react';
  interface TestimonialProps {
    testimonial: {
      id: string;
      name: string;
      role: string;
      company: string;
      content: string;
      rating: number;
      image?: string;
    };
    index: number;
  }
  const Testimonial: FC<TestimonialProps>;
  export default Testimonial;
}