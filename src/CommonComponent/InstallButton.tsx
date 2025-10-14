'use client';
import { Tooltip, IconButton, Zoom } from '@mui/material';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Open the tooltip (not on hover, programmatically after 3s, only if installable)
  useEffect(() => {
    if (deferredPrompt) {
      const timer = setTimeout(() => setTooltipOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [deferredPrompt]);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setTooltipOpen(false);
  };

  const handleCloseTooltip = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTooltipOpen(false);
  };

  if (!deferredPrompt) return null;

  return (
    <Tooltip
      placement="top"
      title={
        <div className="flex items-center gap-1 text-sm bg-clip-text text-white bg-gradient-to-r from-blue-500 to-blue-800">
          Install App
          <IconButton
            size="small"
            style={{ marginLeft: 2, padding: 1 }}
            onClick={handleCloseTooltip}
            aria-label="close"
          >
            <X size={16} />
          </IconButton>
        </div>
      }
      open={tooltipOpen}
      // set followCursor to false (default), and disableHoverListener disables open on hover
      disableHoverListener
      disableFocusListener
      disableTouchListener
      TransitionComponent={Zoom}
      arrow
      slotProps={{
        tooltip: {
          // Blue glass effect with tailwind (backdrop, transparency, border, shadow, blue gradient)
          className:
            "backdrop-blur-lg bg-gradient-to-br from-blue-500/70 to-blue-800/70 border border-blue-400/60 shadow-lg text-white px-2 py-1 rounded-xl"
        },
        arrow: {
          className: "text-blue-500"
        }
      }}
    >
      <button
        onClick={handleInstall}
        className="install-button z-50 bottom-10 left-10 bg-blue-500 text-white px-2 py-2 rounded-full text-sm flex items-center justify-center gap-2 w-10 h-10 hover:bg-blue-600 transition-all duration-300 fixed"
      >
        <Download />
      </button>
    </Tooltip>
  );
}
