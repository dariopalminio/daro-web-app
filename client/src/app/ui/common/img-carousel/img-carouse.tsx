import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import styled from "styled-components";

const ImgCarouselContainer = styled.div`
    width: 300px;
    height: 300px;
    position: relative;
    overflow: hidden; 
    text-align: center;
`;

const ImgCarouselMenu = styled.div`
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    bottom: 0;
`;

const LabelCyrcle = styled.label`
    cursor: pointer;
    display: inline-block;
    background: #a6a6a6;
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin: 0 .2em 1em;
    &:hover {
        background: #e1aa4c;
    }
`;

const ButonPrevious = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 50%;
    left: 0;
    z-index: 5;
    &:hover {
        background: #D4F4FE;
        border-radius: 50%;
    }
`;

const ButonNext = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 50%;
    right: 0;
    z-index: 5;
    &:hover {
        background: #D4F4FE;
        border-radius: 50%;
    }
`;

const ContainerImg = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 1px;
    position: absolute;
    top: 0;
    left: 0;
`;

const ImgObject = styled.img`
    position:absolute;
    left: -100%;
    top: -100%;
    bottom: -100%;
    margin: auto;
    min-height: 100%;
    height: 100%;
`;

interface Props {
    uniqueId: string;
    images: Array<string>; //Array of images URLs
    width: string;
    height: string;
}

/**
 * Img Carousel
 */
const ImgCarousel: React.FC<Props> = ({ uniqueId, images, width, height }) => {
    const [selected, setSelected] = useState(0); //Index of selected image at front
    const zIndexUp = 4; //Image in front has maximum zindex
    const zIndexDown = 3; //Image behind has lower zindex

    const selectImage = (index: number) => {
        setSelected(index);
    }

    const next = () => {
        if (images.length === selected + 1) setSelected(0);
        else setSelected(selected + 1);
    }

    const previous = () => {
        if (selected === 0) setSelected(images.length - 1);
        else setSelected(selected - 1);
    }

    return (<>

        <ImgCarouselContainer style={{ width: width, height: height }}>
            <ImgCarouselMenu>
                {images.map((image, index) => {
                    const referenceName = `imgcarousel-slide-${uniqueId}-${index}`;
                    const cyecleColor =  (selected == index) ? "#31C4F3" : "grey";
                    return (
                        <LabelCyrcle htmlFor={referenceName} style={{background: cyecleColor}}/>
                    );
                })}

                <ButonPrevious onClick={() => previous()}><RiArrowLeftSLine size={28} color="#a6a6a6" /></ButonPrevious>
                <ButonNext onClick={() => next()}><RiArrowRightSLine size={28} color="#a6a6a6" /></ButonNext>
            </ImgCarouselMenu>

            {images.map((image, index) => {
                const referenceName = `imgcarousel-slide-${uniqueId}-${index}`;
                const isSelected = (selected == index);
                const imgZIndex = isSelected ? zIndexUp : zIndexDown;
                const visible = isSelected ? "visible" : "hidden";
                return (<>
                    <input id={referenceName} type="radio" name="slides" onClick={() => selectImage(index)}
                        style={{ zIndex: 1 }}
                        defaultChecked={isSelected}
                    />

                    <ContainerImg>
                        <ImgObject src={image} style={{ zIndex: imgZIndex, left: 0, transition: "left .65s ease-out", visibility: visible }} />
                    </ContainerImg>
                </>
                );
            })}


        </ImgCarouselContainer>
    </>
    );
};// 

export default ImgCarousel;