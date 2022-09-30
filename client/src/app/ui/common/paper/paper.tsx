import styled from "styled-components";

export const PaperWrapper = styled.div`
    width: fit-content;
    max-width: 1000px;
    height: fit-content;
    border: ${props => props.theme.paper.border};
    border-radius: 10px;
    box-shadow: ${props => props.theme.paper.boxShadow};
    margin-top: 10px;
    margin-left: 10px;
    padding: 23px;
    background: white;
    text-align: left;
    @media screen and (min-width: 768px) and (max-width: 1023px) {
            margin: 0px auto;
    }
    @media screen and (max-width: 768px) {
            width: 100%;
            margin: 0px auto;
            border:none;
            box-shadow: none;
    }
`;

interface Props {
    style?: any;
    children?: React.ReactNode;
}

/**
 * Paper for container
 * Stateless components, extensible Style and controlled component
 */
const Paper: React.FC<Props> = ({ children, style }) => {


    return (
        <PaperWrapper
            style={style ? style : {}}>
            {children}
        </PaperWrapper>
  
    );
};

export default Paper;