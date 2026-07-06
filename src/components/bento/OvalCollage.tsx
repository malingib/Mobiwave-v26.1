import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

interface OvalImage {
  src: string;
  alt: string;
}

interface OvalCollageProps {
  images: [OvalImage, OvalImage, OvalImage];
  className?: string;
}

export function OvalCollage({ images, className = '' }: OvalCollageProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className={`flex items-center gap-3 sm:gap-4 max-w-[400px] mx-auto lg:mx-0 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:gap-4 pt-6 sm:pt-10">
        <MotionItem>
          <div className="w-[132px] sm:w-[158px] h-[188px] sm:h-[228px] rounded-[100px] overflow-hidden shadow-lg ring-4 ring-white">
            <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </MotionItem>
        <MotionItem>
          <div className="w-[132px] sm:w-[158px] h-[188px] sm:h-[228px] rounded-[100px] overflow-hidden shadow-lg ring-4 ring-white">
            <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </MotionItem>
      </div>
      <MotionItem>
        <div className="w-[148px] sm:w-[178px] h-[268px] sm:h-[328px] rounded-[100px] overflow-hidden shadow-xl ring-4 ring-white flex-shrink-0">
          <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </MotionItem>
    </motion.div>
  );
}
