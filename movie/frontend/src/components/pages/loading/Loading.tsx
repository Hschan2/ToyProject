import { LOADING_LOTTIE } from '../../constants/FileLink';
import { LoadingContainer, LoadingAnimation } from '../../../style/Loading';

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