import styled from "styled-components";

export const Background = styled.section`
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(
      650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    ),
    radial-gradient(
      1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    );
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

export const Shape1 = styled.div`
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#44006b, #ad1fff);
  position: absolute;
  border-radius: 50%;
`;

export const Shape2 = styled.div`
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#44006b, #ad1fff);
  position: absolute;
`;

export const GlassCard = styled.div`
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
  border-radius: 1rem;
  padding: 2rem;
  z-index: 2;
`;

export const Title = styled.h1`
  color: hsl(218, 81%, 95%);
  font-weight: bold;
  span {
    color: hsl(218, 81%, 75%);
  }
`;

export const SubTitle = styled.p`
  color: hsl(218, 81%, 85%);
  opacity: 0.7;
`;

export const FullWidthBtn = styled.button`
  width: 100%;
`;
