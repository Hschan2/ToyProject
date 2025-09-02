import { create } from 'zustand';

interface MediaState {
  imageSrc: string;
  videoSrc: string | null;
  handleUpload: (file: File | null) => void;
  clearMedia: () => void;
}

let previousUrl: string | null = null;

export const useMediaStore = create<MediaState>((set) => ({
  imageSrc: '',
  videoSrc: null,
  handleUpload: (file) => {
    if (!file) {
      set({ imageSrc: '', videoSrc: null });
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (previousUrl) {
      URL.revokeObjectURL(previousUrl);
      previousUrl = null;
    }

    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        set({ imageSrc: reader.result as string, videoSrc: null });
      };
      reader.readAsDataURL(file);
    } else if (isVideo) {
      const url = URL.createObjectURL(file);
      previousUrl = url;
      set({ imageSrc: '', videoSrc: url });
    }
  },
  clearMedia: () => {
    if (previousUrl) {
      URL.revokeObjectURL(previousUrl);
      previousUrl = null;
    }
    set({ imageSrc: '', videoSrc: null });
  },
}));
