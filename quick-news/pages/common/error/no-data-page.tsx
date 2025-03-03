import { NoDataNewsEmoji, NoDataNewsWrapper } from "@/pages/common/error/style/error-style";

export default function NoDataPage() {
  return (
    <NoDataNewsWrapper>
      <NoDataNewsEmoji>😢</NoDataNewsEmoji>
      <h3>뉴스 데이터가 없습니다.</h3>
    </NoDataNewsWrapper>
  )
}
