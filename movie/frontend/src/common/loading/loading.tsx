import { LOADING_LOTTIE } from '../../../common/loading/constants/loading-error-link';
import { LoadingContainer, LoadingAnimation } from '../../../common/loading/style/loading-style';

/**
 * 로딩 페이지 컴포넌트
 * @returns 로딩 페이지 출력
 */
function Loading() {
  return (
    <LoadingContainer>
      <LoadingAnimation srcLink={LOADING_LOTTIE} />
    </LoadingContainer>
  )
}

export default Loading