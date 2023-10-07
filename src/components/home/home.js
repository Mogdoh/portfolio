import React, { useState, useEffect } from "react";
import StartMenu from "./StartMenu.js";
import { useDispatch } from 'react-redux';
import { toggleCalendarAction, toggleStartMenu } from "../action/Actions.js";
import Calendar from "./Calendar.js";

const Home = () => {
    const dispatch = useDispatch();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // 1초마다 현재 날짜 및 시간을 업데이트
    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedDateTime = new Date();
            setCurrentDateTime(updatedDateTime);
        }, 1000);

        // 컴포넌트가 언마운트되면 인터벌 제거
        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');
    


    const handleOpenStartMenu = () => {
        dispatch(toggleStartMenu());
    }

    const handleOpenCalendar = () => {
        dispatch(toggleCalendarAction());
    }
    
    return(
        <div className="home">
            
            <div className="top">
                <div>휴지통</div>
                <div>내 깃</div>
                <div>내 노션</div>
                <div>프로젝트1</div>
            </div>
            
            <div className="bottom">
                <ul className="window-bottom-bar">
                    <button>검색창</button>
                    <button>기타 페이지들</button>
                    <button>날씨</button>
                    <button>위젯들</button>
                    <button>오른쪽 섬띵</button>
                </ul>
                
                <div className="window-button">
                    <button onClick={handleOpenStartMenu}>열기 버튼</button>
                    <StartMenu />

                    <button onClick={handleOpenCalendar}>
                        {formattedTime} {formattedDate}
                    </button>
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default Home;
