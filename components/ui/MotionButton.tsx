import { motion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MotionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  whileFocus?: MotionProps['whileFocus'];
  whileInView?: MotionProps['whileInView'];
  animate?: MotionProps['animate'];
  initial?: MotionProps['initial'];
  exit?: MotionProps['exit'];
  transition?: MotionProps['transition'];
  variants?: MotionProps['variants'];
  custom?: MotionProps['custom'];
  onAnimationStart?: MotionProps['onAnimationStart'];
  onAnimationComplete?: MotionProps['onAnimationComplete'];
  onHoverStart?: MotionProps['onHoverStart'];
  onHoverEnd?: MotionProps['onHoverEnd'];
  onTap?: MotionProps['onTap'];
  onTapStart?: MotionProps['onTapStart'];
  onTapCancel?: MotionProps['onTapCancel'];
  onDrag?: MotionProps['onDrag'];
  onDragStart?: MotionProps['onDragStart'];
  onDragEnd?: MotionProps['onDragEnd'];
}

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...props}
        className={cn(className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";

export default MotionButton;
