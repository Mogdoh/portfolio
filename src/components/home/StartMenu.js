import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleStartMenu } from "../action/Actions.js";
import { useOutsideClick } from './OutsideClick';
import "../../css/StartMenu.css";

function StartMenu() {
    const isOpen = useSelector((state) => state.isStartMenuOpen);
    const dispatch = useDispatch();
    const startMenuRef = useRef(null);

    const handleButtonClick = () => {
        dispatch(toggleStartMenu(true));
    };

    const handleAppItemClick = (appName) => {
        // 응용 프로그램 목록 아이템 클릭 시 수행할 동작 추가
        console.log(`앱 "${appName}"을 실행합니다.`);
    };

    useOutsideClick(startMenuRef, () => {
        if (isOpen) {
            dispatch(toggleStartMenu(false));
        }
    });

    return (
        <div ref={startMenuRef} className={`start-menu ${isOpen ? 'open' : ''}`}>
            <button onClick={handleButtonClick} className="start-button">
                시작 버튼 이미지
            </button>

            <ul className="program-list">
                <li onClick={() => handleAppItemClick("휴지통")}>휴지통</li>
                <li onClick={() => handleAppItemClick("내 깃")}>내 깃</li>
                <li onClick={() => handleAppItemClick("내 노션")}>내 노션</li>
                <li onClick={() => handleAppItemClick("프로젝트1")}>프로젝트1</li>
            </ul>
        </div>
    );
}

export default StartMenu;
