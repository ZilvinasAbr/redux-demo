type Props = {
  imageUrls: string[];
};

export const ImagesContainer = ({ imageUrls }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {imageUrls.map((url, index) => (
        <img width="300" alt={`Image No. ${index + 1}`} src={url} />
      ))}
    </div>
  );
};
