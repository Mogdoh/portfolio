import React from "react";
import StartMenu from "./StartMenu.js";
import { useDispatch } from 'react-redux';
import { toggleStartMenu } from "../action/Actions.js";
import Calendar from "../start/Calendar.js"
import "../../css/Home.css"


const Home = () => {
    const dispatch = useDispatch();

    const handleOpenStartMenu = () => {
        dispatch(toggleStartMenu());
    }
    
    return(
        <div className="home">
            <div className="background_image">
            
            <div className="top">
                <div>휴지통</div>
                <div>
                    <a href="https://github.com/Mogdoh/portfolio">깃 주소</a>
                </div>
                <div>내 노션</div>
                <div>프로젝트1</div>
            </div>

            <div className="bottom">
                    <StartMenu />
                    <button>검색창</button>
                    <button>기타 페이지들</button>
                    <button>날씨</button>
                    <button>위젯들</button>
                    <Calendar />
                    <button>오른쪽 섬띵</button>
                <button onClick={handleOpenStartMenu}>열기 버튼</button>
            </div>
            
            </div>
        </div>
    );
};

export default Home;