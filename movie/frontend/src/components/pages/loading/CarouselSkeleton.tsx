import { Skeleton, SkeletonLayout } from "../../../style/Loading";

export default function CarouselSkeleton() {
  const CarouselList = [1, 2, 3, 4, 5];

  return (
    <SkeletonLayout>
      {CarouselList?.map((value) => (
        <Skeleton key={value} width="140px" height="220px" margin="4px" />
      ))}
    </SkeletonLayout>
  );
}
