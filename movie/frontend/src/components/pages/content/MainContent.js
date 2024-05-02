import React from 'react'
import { BackImage, Container, Description, ImageContainer, Overlay, TextContainer } from '../../../style/MainContent';

function MainContent() {
    return (
        <Container>
            <ImageContainer>
                <Overlay></Overlay>
                <BackImage src='/logo512.png' alt='Main Image' />
                <TextContainer>
                    <h2>이미지 위에 텍스트</h2>
                    <Description>추가할 텍스트 내용</Description>
                </TextContainer>
            </ImageContainer>
        </Container>
    )
}

export default MainContent