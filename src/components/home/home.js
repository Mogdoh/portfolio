import React from "react";

const home = () => {
    return(
        <div className="home">
            
            <div className="top">
                <div>휴지통</div>
                <div>내 깃</div>
                <div>내 노션</div>
                <div>프로젝트1</div>
            </div>

            <div className="bottom">
                <ul className="window_bottom_bar">
                    <li>윈도우 버튼</li>
                    <li>검색창</li>
                    <li>기타 페이지들</li>
                    <li>날씨</li>
                    <li>위젯들</li>
                    <li>캘린더</li>
                    <li>오른쪽 섬띵</li>
                </ul>
            </div>
        </div>

    );
};

export default home;