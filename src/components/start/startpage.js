import React, { useEffect, useState } from "react";
import Loading from "./LoadingSpinner.js"
import { Link } from "react-router-dom";
import Home from "../home/Home.js";
import { useNavigate } from "react-router-dom";
import BackGroundImage from "../../images/window.jpg"

function StartPage() {
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // 5초 후에 확인 버튼 표시
        const timer = setTimeout(() => {
            setShowConfirmButton(true);
            setShowLoading(false);
        }, 5000);
        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, []);
    
        const handleConfirmClick = () => {
            navigate(`/home`)
        };

        function ConfirmButton( {onClick}) {
            return (
                <button onClick={onClick}>Enter</button>
            );
        }

    return (
        <div style={{
            minWidth: "100vw",
            minHeight: "100vh",
            position: "relative",
        }}> 
            {showLoading ? (
                <div style={{ position: "relative", zIndex: 2 }}>
                    <p>로딩 중...</p>
                    <Loading />
                </div>
            ) : (
                showConfirmButton && (
                    <ConfirmButton onClick={handleConfirmClick} style={{ position: "relative" }} />
                )
            )}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${BackGroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                opacity: "0.3",
                zIndex: 1,
                pointerEvents: "none",
                }}/>
        </div>
    );
    }

export default StartPage;