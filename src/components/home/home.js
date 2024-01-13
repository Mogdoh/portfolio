import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleCalendarAction, toggleStartMenu } from "../action/Actions.js";
import StartMenu from "./StartMenu.js";
import Calendar from "./Calendar.js";
import BackGroundImage from "../../images/window.jpg";
import "../../css/Home.css";
import RecyclingBin from "../../images/empty.png";
import Git from "../../images/git.png";
import Computer from "../../images/icon_computer.png"



const Home = () => {
    const dispatch = useDispatch();
    const isStartMenuOpen = useSelector((state) => state.isStartMenuOpen);
    const isCalendarOpen = useSelector((state) => state.isCalendarOpen);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    // outside click
    const startMenuRef = useRef(null);
    const calendarRef = useRef(null);
    const startMenuButtonRef = useRef(null);
    const calendarButtonRef = useRef(null);
    
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

    const handleComputer = (event) => {
        if (event.detail === 2 ) {
            
        }
    }

    const handleGitClick = event => {
        if (event.detail === 2) {
            window.open("https://github.com/Mogdoh/portfolio.git", "_blank");
        }
    };

    const openWindow = event => {
        if (event.detail === 2) {
            openModal();
        }
    };

    // Outside click 이벤트 핸들러
    const handleClickOutside = (event) => {
        if (event.target.closest('.windowButton')) {
            return;
        }

        if (isStartMenuOpen && startMenuRef.current && !startMenuRef.current.contains(event.target) && !startMenuButtonRef.current.contains(event.target)) {
            dispatch(toggleStartMenu());
        }
    };

    // 컴포넌트 마운트 후 클릭 이벤트 리스너 등록, 언마운트 시 리스너 제거
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isStartMenuOpen]);

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
            <div className="home_top" style={{marginLeft: '0.5%'}}>
                <div className="icon">
                    <img src= {RecyclingBin} className="recycling-bin" alt="logo" />
                    <h4>휴지통</h4>
                </div> 

                <div className="icon">
                    <img src={Git} onClick={handleGitClick} className="git" alt="logo" />
                    <h4>GitHub</h4>
                </div>

                <div className="icon">
                    <img src={Computer} onClick={handleComputer} className="computer" alt="logo"/>
                    <h4>내 컴퓨터</h4>
                </div>

                <div>File Explorer</div>
                
                <div onClick={openWindow}>Broswer</div>
                    {isModalOpen && (
                        <div className="modal-container">
                            <div className="popup-wrap" id="popup">
                                <div className="popup-head">
                                    <span className="head-title">Broswer
                                        <span>축소</span>
                                        <span>전체화면</span>
                                        <span className='close' onClick={closeModal}>&times;</span>
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
                    
                <div>FionFow</div>
            </div>

            <div className="home_bottom">
                <div className="window_widget">
                        <button onClick={handleOpenStartMenu} ref={startMenuButtonRef} style={{
                            marginLeft: '1%'
                        }}>
                            열기
                        </button>
                    {isStartMenuOpen && <StartMenu ref={startMenuRef} />}

                        <p style={{
                            whiteSpace: 'pre-wrap',
                            marginLeft: '90%',
                            color: 'white',
                            width: 'auto',
                            height: 'auto'
                            }}>
                            <span style={{marginLeft: '10px'}}>{formattedTime}</span> <br/> {formattedDate} 
                        </p>

                </div>
            </div>
        </div>
    );
};

export default Home;
