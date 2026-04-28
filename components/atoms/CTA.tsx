import { useState } from "react";
import { motion } from "framer-motion";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";
import Button from "../ui/button";
function CTA() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        className="
                flex
                flex-col sm:flex-row
                gap-4
                justify-center
                lg:justify-start
              "
      >
        <Button
          size="lg"
          className="
                  rounded-none cursor-pointer
                  px-6 py-3 text-sm
                  sm:px-8 sm:py-5 sm:text-base
                  md:px-10 md:py-6 md:text-lg
                "
          onClick={() => setModalOpen(true)}
        >
          Get Early Access
        </Button>

        {/* <button
          className="
                  px-6 py-3 text-sm cursor-pointer
                  sm:px-8 sm:py-5 sm:text-base
                  md:px-10 md:py-6 md:text-lg
                  border border-border
                  text-foreground
                  hover:bg-surface
                  transition
                "
        >
          Join 500+ early users
        </button> */}
      </motion.div>
    </>
  );
}
export default CTA;
