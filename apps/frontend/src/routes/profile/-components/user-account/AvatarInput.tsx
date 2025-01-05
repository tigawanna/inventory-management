import { useRef } from "react";


interface AvatarInputProps {
  editing: boolean;
  userAvatar: { avatarFile: File | null; avatarUrl: string; alt: string }; 
  setUserAvarat: (data: { avatarFile: File | null; avatarUrl: string }) => void;
}

export function AvatarInput({
  editing,
  userAvatar,
  setUserAvarat,
}: AvatarInputProps) {
  const imagInpt = useRef<HTMLInputElement>(null);

  function handleInageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setUserAvarat({
        avatarFile: e.target.files[0],
        avatarUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  }


    return (
      <div className="flex gap-2">
        <input
          // accept jpg,png,webp,avif
          accept="image/png, image/jpeg, image/webp, image/avif"
          ref={imagInpt}
          type="file"
          className="hidden"
          onChange={handleInageChange}
        />
        <div
          onClick={() => imagInpt.current?.click()}
          className="max-h-[90%] flex max-w-md flex-col items-center justify-center border"
        >
          <img
            onClick={() => imagInpt.current?.click()}
            className="size-full object-cover"
            src={userAvatar.avatarUrl}
          />
          <div className="mt-2 text-sm text-accent-content">Change Photo</div>
        </div>
      </div>
    );

}
