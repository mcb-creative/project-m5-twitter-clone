import styled, { keyframes } from "styled-components";
import { VscLoading } from "react-icons/vsc";

const LoadingIcon = () => {
  return (
    <Icon>
      <VscLoading size={36} />
    </Icon>
  );
};

export default LoadingIcon;

const rotate = keyframes`
from {
    transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
`;

const Icon = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 5px;
  font-size: 1.2rem;
`;
