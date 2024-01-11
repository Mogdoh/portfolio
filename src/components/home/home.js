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
import SearchBar from "../widget/SearchBar.js";

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

    const handleGitClick = event => {
        if (event.detail === 2 ){
            window.open("https://github.com/Mogdoh/portfolio.git", "_blank");
        }
    }

    const openWindow = event => {
        if (event.detail === 2) {
            openModal();
        }
    }
    
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
                    <img src={Git} onClick={handleGitClick} className="git" alt="logo" />
                </div>
                <div>내 컴퓨터</div>
                <div>File Explorer</div>
                <div onClick={openWindow}>Broswer</div>
                    {isModalOpen && (
                        <div className="modal-container">
                            <div className="popup-wrap" id="popup">
                                <div className="popup-head">
                                    <span className="head-title">Broswer
                                        <span>축소</span>
                                        <span>전체화면</span>
                                        <spna className='close' onClick={closeModal}>&times;</spna>
                                    </span>
                                </div>
                                <div className="popup-body">
                                    <div className="body-content">
                                        <iframe className="broswer-content" src="https://www.google.com/search?igu=1" title="Google" />
                                    </div>
                                </div>
                            </div>    
                        </div>
                    )}
                <div>내 노션</div>
                <div>FionFow</div>

            </div>

            <div className="home_bottom">
                <div className="window_widget">
                    <button className="home_button" onClick={handleOpenStartMenu}>
                        열기 버튼
                    </button>
                    {isStartMenuOpen && <StartMenu ref={startMenuRef} />}

                    <SearchBar></SearchBar>

                    위젯1, 위젯2, 위젯3, 위젯4

                    <button className="window_calendar" onClick={handleOpenCalendar}>
                        {formattedTime} {formattedDate}
                    </button>
                    {isCalendarOpen && <Calendar ref={calendarRef} />}
                </div>
            </div>
        </div>
    );
};

export default Home;
