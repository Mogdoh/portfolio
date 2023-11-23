import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleCalendarAction, toggleStartMenu } from "../action/Actions.js";
import StartMenu from "./StartMenu.js";
import Calendar from "./Calendar.js";
import BackGroundImage from "../../images/window.jpg";
import "../../css/Home.css";
import RecyclingBin from "../../images/empty.png"
import PulledBin from "../../images/pulled.png"
import Git from "../../images/git.png"

const Home = () => {
    const dispatch = useDispatch();
    const isStartMenuOpen = useSelector((state) => state.isStartMenuOpen);
    const isCalendarOpen = useSelector((state) => state.isCalendarOpen);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    //outside click
    const startMenuRef = useRef(null);
    const calendarRef = useRef(null);

    const printDate = () => {
        const today = new Date();
        const year = today.toLocaleDateString('en-US', {
            year: 'numeric',
        });
        const month = today.toLocaleDateString('en-US', {
            month: '2-digit',
        });
        const day = today.toLocaleDateString('en-US', {
            day: '2-digit',
        });

        return `${year}-${month}-${day}`;
    };

    // 1초마다 현재 시간을 업데이트
    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedDateTime = new Date();
            setCurrentDateTime(updatedDateTime);
        }, 1000);

        // 컴포넌트가 언마운트되면 인터벌 제거
        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = printDate();

    const handleOpenStartMenu = (event) => {
        dispatch(toggleStartMenu());
    };

    const handleOpenCalendar = () => {
        dispatch(toggleCalendarAction());
    };

    // Outside click 이벤트 핸들러
    const handleClickOutside = (event) => {
        if (event.target.closest('.windowButton')) {
            return;
        }

        if (isStartMenuOpen && startMenuRef.current && !startMenuRef.current.contains(event.target)) {
            dispatch(toggleStartMenu());
        }
        if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(event.target)) {
            dispatch(toggleCalendarAction());
        }
    };
    
    // 컴포넌트 마운트 후 클릭 이벤트 리스너 등록, 언마운트 시 리스너 제거
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        
    }, [isStartMenuOpen, isCalendarOpen])

    const handleScroll = (e) => {
        e.preventDefault(); // 기본 스크롤 동작 방지
        e.stopPropagation(); // 이벤트 전파 중단
        return false; // 다른 브라우저 기본 동작 방지
    };
    
    // 스크롤 이벤트 처리
    useEffect(() => {
        document.addEventListener("wheel", handleScroll, { passive: false });
        return () => {
            document.removeEventListener("wheel", handleScroll, { passive: false });
        };
    }, []);
    
    
    return (
        <div className="home" 
            style={{
                backgroundImage: `url(${BackGroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minWidth: "100vw",
                minHeight: "100vh",
            }}
        >
            <div  className="home_top">
                <div className="icon">
                    <img src= {RecyclingBin} className="recycling-bin" alt="logo" />
                </div> 
                <div className="icon">
                    <a href="https://github.com/Mogdoh/portfolio.git" target="_blank">
                        <img src={Git} className="git" alt="logo" />
                    </a>
                </div>
                <div>내 노션</div>
                <div>FionFow</div>
            </div>

            <div className="home_bottom">
                <div className="window_widget">
                    <button className="" onClick={handleOpenStartMenu}>
                        열기 버튼
                    </button>
                    {isStartMenuOpen && <StartMenu ref={startMenuRef} />}

                    <button onClick={handleOpenCalendar}>
                        {formattedTime} {formattedDate}
                    </button>
                    {isCalendarOpen && <Calendar ref={calendarRef} />}
                </div>
            </div>
        </div>
    );
};

export default Home;
