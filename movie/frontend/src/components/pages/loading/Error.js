import { ErrorContainer, ErrorMessage } from "../../../style/Loading";

export function Error404({ status }) {
    return (
        <ErrorContainer stat={status}>
            <ErrorMessage>404 Error | 페이지를 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
    )
}

export function Error500({ status }) {
    return (
        <ErrorContainer stat={status}>
            <ErrorMessage>500 Error | 데이터를 가져오지 못했습니다.</ErrorMessage>
        </ErrorContainer>
    )
}