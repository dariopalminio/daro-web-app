import React, { useState } from "react";
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri"; //ChevronLeftIcon
import { RiArrowRightSLine } from "react-icons/ri"; //ChevronRightIcon

const PaginationWrapper = styled.div`
    display: flex;
    vertical-align: middle;
    justify-content: center;
    background: transparent;
    border: none;
    a {
        cursor: pointer;
        margin-top: 0px;
        color: black;
        text-decoration: none;
        padding: 5px;
    }
`;

const PaginationInfo = styled.div`
    margin-top: 0px;
    display: flex;
    height: 25px;
    background: linear-gradient(45deg, #EEEEEE 30%, #F9F9F9 90%);
    border: 1px solid #F1F0F0;
    border-radius: 5px;
    p{
        margin-top: 0px;
        line-height: 14px;
        font: 12px "Helvetica Neue", Helvetica, Arial, sans-serif;
        vertical-align: middle;
        padding: 5px;

    }
`;

const PaginationAction = styled.button`
    margin-top: 0px;
    display: flex;
    background: transparent;
    border: none;
    &:hover {
        background: #F7F7F7;
        a {
            color: #FF7B1A;
        }
    }
`;

interface Props {
    previousLabel?: string;
    nextLabel?: string;
    ofLabel?: string;
    page: number;
    maxPage: number;
    onClickPrevious: () => void;
    onClickNext: () => void;
    style?: any;
}

/**
 * Pagination
 */
const Pagination: React.FC<Props> = ({ page, maxPage, onClickPrevious, onClickNext, previousLabel, ofLabel, nextLabel, style }) => {

    const [isNextHover, setIsNextHover] = useState(false);
    const [isPreviousHover, setIsPreviousHover] = useState(false);

    return (
        <PaginationWrapper>
            {(page > 1) &&
                <PaginationAction onClick={() => onClickPrevious()} onMouseEnter={() => setIsPreviousHover(true)} onMouseLeave={() => setIsPreviousHover(false)}>
                    <RiArrowLeftSLine size='25' color={isPreviousHover ? '#FF7B1A' : 'black'} />
                    <a id="pegination_previous">
                        {previousLabel ? previousLabel : ''}</a>
                </PaginationAction>
            }
            <PaginationInfo>
                <p>{page}</p><p>{ofLabel ? ofLabel : 'of'}</p><p>{maxPage}</p>
            </PaginationInfo>
            {(page < maxPage) &&
                <PaginationAction onClick={() => onClickNext()} onMouseEnter={() => setIsNextHover(true)} onMouseLeave={() => setIsNextHover(false)}>
                    <a id="pagination_next">{nextLabel ? nextLabel : ''}
                    </a>
                    <RiArrowRightSLine size='25' color={isNextHover ? '#FF7B1A' : 'black'} />
                </PaginationAction>
            }
        </PaginationWrapper>
    );
};

export default Pagination;