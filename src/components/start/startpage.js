import React, { useEffect, useState } from "react";
import Loading from "./LoadingSpinner.js"
import { Link } from "react-router-dom";
import Home from "../home/Home";
import { useNavigate } from "react-router-dom";

    
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
        <div>
            {showLoading ? (
            <div>
                <p>로딩 중...</p>
                    <Loading />
            </div>
            ) : (
            showConfirmButton && <ConfirmButton onClick={handleConfirmClick} />
            )}
        </div>
        );
    }

export default StartPage;