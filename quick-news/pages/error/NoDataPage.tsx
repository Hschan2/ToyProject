import { NoDataNewsEmoji, NoDataNewsWrapper } from "../../styles/ErrorStyle";

export default function NoDataPage() {
  return (
    <NoDataNewsWrapper>
      <NoDataNewsEmoji>😢</NoDataNewsEmoji>
      <h3>뉴스 데이터가 없습니다.</h3>
    </NoDataNewsWrapper>
  )
}
