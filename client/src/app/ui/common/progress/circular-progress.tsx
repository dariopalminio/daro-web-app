import styled from "styled-components";

const CircularProgressContainer = styled.div`
  margin-top: 2rem;
  padding-top: 10px;
  justify-content: "center";
  text-align:center;
  display: "flex";
  margin: 0px auto;
`;

const CircularAnimation = styled.div`
  border: 4px solid #aee0f7; 
  border-top: 4px solid #e676dc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin:0px auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LabelProgress = styled.div`
  margin: 0px auto;
`;

interface Props {
  children?: React.ReactNode;
}

/**
 * Circular Progress for loading process
 * Stateless components and controlled component
 */
const CircularProgress: React.FC<Props> = ({ children }) => {

  return (
    <CircularProgressContainer>
      <LabelProgress>{children}</LabelProgress>
      <CircularAnimation></CircularAnimation>
    </CircularProgressContainer>
  );
};

export default CircularProgress;